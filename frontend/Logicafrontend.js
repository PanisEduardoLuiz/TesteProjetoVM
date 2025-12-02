// script.js (frontend)
document.addEventListener('DOMContentLoaded', () => {
    // --- Configuração da API ---
    const API_BASE = 'http://177.44.248.44:3000'; 
    
    // Armazenamento de token e dados do usuário
    const token = localStorage.getItem('token');
    const me = JSON.parse(localStorage.getItem('me') || 'null');

    // Elementos de Modais e Páginas
    const registrationModal = document.getElementById('registration-modal');
    const loginModal = document.getElementById('login-modal');
    const modalEventName = document.getElementById('modal-event-name');
    let currentEventId = null;
    
    // Elementos da página de Certificados
    const validationForm = document.getElementById('certificate-validation-form');
    const certificateResultDiv = document.getElementById('certificate-result');
    const validationMessage = document.getElementById('validation-message');
    const certificateEventName = document.getElementById('certificate-event-name');
    const downloadLink = document.getElementById('download-link');
    
    // Elementos do Modal de Check-in (minhas_inscricoes.html)
    const checkinModal = document.getElementById('checkin-modal');
    const checkinModalEventName = document.getElementById('checkin-modal-event-name');
    const checkinInscricaoIdInput = document.getElementById('checkin-inscricao-id');
    const checkinCodeInput = document.getElementById('checkin-code-input');
    const checkinErrorMsg = document.getElementById('checkin-error-msg');
    const codeCheckinForm = document.getElementById('code-checkin-form');


    // ---------- Lógica de Tema ----------
    const themeSwitcher = document.getElementById('theme-switcher');
    const themeLink = document.getElementById('theme-link');
    const savedTheme = localStorage.getItem('theme');
    const applyTheme = (theme) => {
        if (themeLink) themeLink.href = `tema/${theme}-theme.css`;
        if (themeSwitcher) themeSwitcher.checked = (theme === 'light');
    };
    if (savedTheme) applyTheme(savedTheme); else applyTheme('dark');
    if (themeSwitcher) themeSwitcher.addEventListener('change', () => {
        const newTheme = themeSwitcher.checked ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // ---------- HELPERS DE COMUNICAÇÃO (API) ----------
    const authHeaders = () => {
        const t = localStorage.getItem('token');
        return t ? { 'Authorization': 'Bearer ' + t } : {};
    };

    async function apiFetch(path, opts = {}) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {}, authHeaders());
        
        // COMENTÁRIO: Aqui a requisição real é feita. Use logs do console para ver falhas.
        const res = await fetch(API_BASE + path, Object.assign({}, opts, { headers }));
        const json = await res.json();
        if (!res.ok) throw json;
        return json;
    }

    // ---------- AUTH UI (Login/Register) ----------
    const loginForm = document.getElementById('login-form');
    const registrationForm = document.getElementById('registration-form');

    async function doLogin(email, senha) {
        // COMENTÁRIO: LÓGICA MOCKADA: Substitua este bloco pela chamada real à API
        try {
            // SIMULAÇÃO DE SUCESSO (Usuário Teste)
            const r = { token: 'mock-token', user: { id: 1, nome: 'Teste Silva', email: email, is_admin: true } };
            
            localStorage.setItem('token', r.token);
            localStorage.setItem('me', JSON.stringify(r.user));
            
            window.location.href = 'eventos.html'; 
            
        } catch (err) {
            alert('Falha no login (MOCK): ' + (err.error || 'Verifique o console.'));
        }
    }

    async function doRegister(nome, email, cpf, senha) {
        // COMENTÁRIO: LÓGICA MOCKADA: Substitua este bloco pela chamada real à API
        try {
            // SIMULAÇÃO DE SUCESSO
            alert('Cadastro realizado com sucesso (MOCK). Faça login.');
            
            window.location.href = 'index.html';
        } catch (err) {
            alert('Falha no cadastro (MOCK): ' + (err.error || 'Verifique o console.'));
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-password').value; 
            doLogin(email, senha);
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const cpf = document.getElementById('cpf').value;
            const senha = document.getElementById('reg-password').value;
            doRegister(nome, email, cpf, senha);
        });
    }
    
    // Abre o Modal de Login
    const openLoginModalBtn = document.getElementById('open-login-modal-btn');
    if (openLoginModalBtn) {
        openLoginModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginModal) loginModal.classList.remove('hidden');
        });
    }
    
    // Lógica de fechamento do modal de login
    if (loginModal) {
        const closeModalButtons = loginModal.querySelectorAll('.close-modal');
        closeModalButtons.forEach(b => b.addEventListener('click', () => loginModal.classList.add('hidden')));
        loginModal.addEventListener('click', (e) => { if (e.target === loginModal) loginModal.classList.add('hidden'); });
    }

    // logout
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('me');
            window.location.reload();
        });
    }

    // ---------- ATUALIZAÇÃO DO CABEÇALHO (UPDATE) ----------
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const userGreeting = document.getElementById('user-greeting');

    const minhasInscricoesLink = document.getElementById('minhas-inscricoes-link');
    const checkinLink = document.getElementById('checkin-link');
    const certificadosLink = document.getElementById('certificados-link');
    const adminLink = document.getElementById('admin-link');
    
    function updateHeaderUI() {
        const me = JSON.parse(localStorage.getItem('me') || 'null');
        
        if (me) {
            // USUÁRIO LOGADO
            if (loginLink) loginLink.classList.add('hidden');
            if (registerLink) registerLink.classList.add('hidden');
            if (logoutLink) logoutLink.classList.remove('hidden');
            
            if (userGreeting) {
                userGreeting.textContent = `Olá, ${me.nome.split(' ')[0]}`;
                userGreeting.classList.remove('hidden');
            }

            if (minhasInscricoesLink) minhasInscricoesLink.classList.remove('hidden');
            if (checkinLink) checkinLink.classList.remove('hidden');
            if (certificadosLink) certificadosLink.classList.remove('hidden');

            const isAdmin = me && (me.role === 'admin' || me.is_admin === true); 
            if (adminLink) {
                if (isAdmin) {
                    adminLink.classList.remove('hidden');
                } else {
                    adminLink.classList.add('hidden');
                }
            }

        } else {
            // USUÁRIO DESLOGADO
            if (loginLink) loginLink.classList.remove('hidden');
            if (registerLink) registerLink.classList.remove('hidden');
            if (logoutLink) logoutLink.classList.add('hidden');
            
            if (minhasInscricoesLink) minhasInscricoesLink.classList.add('hidden');
            if (checkinLink) checkinLink.classList.add('hidden');
            if (certificadosLink) certificadosLink.classList.add('hidden');
            if (adminLink) adminLink.classList.add('hidden'); 
            
            if (userGreeting) {
                userGreeting.textContent = '';
                userGreeting.classList.add('hidden');
            }
        }
    }
    updateHeaderUI();

    // ---------- FUNÇÕES DE CONTEÚDO (Eventos e Inscrições) ----------
    
    
    async function loadEventos() {
        // COMENTÁRIO: LÓGICA MOCKADA: Substitua este bloco para fazer um GET /api/eventos real.
        
        const eventosSimulados = [
            { id: 1, nome: "Workshop de Refatoração", data_inicio: new Date(2026, 0, 15, 19, 0), localizacao: "Sala de Treinamento Alpha" },
            { id: 2, nome: "Palestra: Futuro do Desenvolvimento Web", data_inicio: new Date(2026, 1, 28, 14, 30), localizacao: "Teatro Municipal" },
            { id: 3, nome: "Feira de Tecnologia e Inovação", data_inicio: new Date(2026, 2, 10, 10, 0), localizacao: "Centro de Convenções" }
        ];
        
        let r = { data: eventosSimulados }; 
        
        // Exemplo da chamada REAL que deve ser restaurada:
        /*
        try {
            r = await apiFetch('/api/eventos');
        } catch (e) {
            console.error("Falha na API de Eventos:", e);
            r = { data: eventosSimulados }; // Fallback para mock
        }
        */

        const eventosContainer = document.getElementById('events-list');
    
        if (!eventosContainer) return;

        eventosContainer.innerHTML = '';
        
        if (r.data.length === 0) {
            eventosContainer.innerHTML = '<p style="text-align:center;margin-top:20px">Nenhum evento disponível no momento.</p>';
            return;
        }

        r.data.forEach(ev => {
            const li = document.createElement('li');
            li.className = 'event-card';
            li.innerHTML = `
                <h3>${ev.nome}</h3>
                <p>Data: ${new Date(ev.data_inicio).toLocaleString('pt-BR')}</p>
                <p>Local: ${ev.localizacao || 'Online'}</p>
                <button class="subscribe-btn" data-event-id="${ev.id}">Inscrever-se</button>
            `;
            eventosContainer.appendChild(li);
        });

        // hooks dos botões de inscrição
        document.querySelectorAll('.subscribe-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const me = JSON.parse(localStorage.getItem('me') || 'null');
                if (!me) {
                    if (loginModal) loginModal.classList.remove('hidden');
                    return;
                }
                
                const eventId = parseInt(btn.getAttribute('data-event-id'), 10);
                openSubscribeModal(eventId);
            });
        });
    }
    
    // Função para abrir o modal de inscrição
    function openSubscribeModal(eventId) {
        currentEventId = eventId;
        
        // MOCK: Exibe o modal com o nome do evento simulado
        const eventData = [
            { id: 1, nome: "Workshop de Refatoração" },
            { id: 2, nome: "Palestra: Futuro do Desenvolvimento Web" },
            { id: 3, nome: "Feira de Tecnologia e Inovação" }
        ].find(e => e.id === eventId);
        
        if (registrationModal) registrationModal.classList.remove('hidden');
        if (modalEventName) modalEventName.textContent = eventData ? eventData.nome : `Evento ID ${eventId}`;
    }
    
    // Lógica para lidar com o formulário de submissão do modal de inscrição
    const subscribeForm = document.getElementById('subscribe-form');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // COMENTÁRIO: LÓGICA MOCKADA: Substitua este bloco para um POST /api/inscricao real.
            try {
                // EX: await apiFetch('/api/inscricao', { method: 'POST', body: JSON.stringify({ evento_id: currentEventId }) });
                
                alert('Inscrição realizada com sucesso (MOCK)!');
                if (registrationModal) registrationModal.classList.add('hidden');
                
            } catch (err) {
                alert('Erro ao inscrever (MOCK): ' + (err.error || 'Você pode já estar inscrito.'));
            }
        });
    }
    
    // Função loadMyInscriptions (NOVA LÓGICA PARA minhas_inscricoes.html)
    async function loadMyInscriptions() {
        const me = JSON.parse(localStorage.getItem('me') || 'null');
        const list = document.getElementById('my-inscriptions-list');

        if (!me) {
            if (list) list.innerHTML = '<p style="text-align:center;margin-top:20px">Faça login para ver suas inscrições.</p>';
            return; 
        }

        // COMENTÁRIO: LÓGICA MOCKADA: Substitua este bloco para fazer um GET /api/inscricao/me real.
        let r;
        try {
            // EX: r = await apiFetch('/api/inscricao/me');
            
            // SIMULAÇÃO: Dados mockados de inscrições
            r = { 
                data: [
                    { id: 101, evento: "Workshop de Refatoração", data_evento: new Date(2026, 0, 15, 19, 0), status: 'Inscrito' },
                    { id: 102, evento: "Palestra: Futuro do Web", data_evento: new Date(2026, 1, 28, 14, 30), status: 'Presença Confirmada' },
                    { id: 103, evento: "Feira de Tecnologia", data_evento: new Date(2026, 2, 10, 10, 0), status: 'Cancelado' }
                ] 
            };
            
        } catch (err) {
            console.error('Falha ao carregar inscrições (MOCK):', err);
            if (list) list.innerHTML = '<p style="color:red;text-align:center;">Falha ao carregar inscrições da API.</p>';
            return;
        }

        if (!list) return;
        list.innerHTML = '';

        if (r.data.length === 0) {
            list.innerHTML = '<p style="text-align:center;margin-top:20px">Você ainda não se inscreveu em nenhum evento.</p>';
            return;
        }

        r.data.forEach(i => {
            const li = document.createElement('li');
            li.className = 'event-card';
            
            const canCheckin = i.status === 'Inscrito';
            const canCancel = i.status === 'Inscrito';

            li.innerHTML = `
                <h3>${i.evento}</h3>
                <p>Data: ${new Date(i.data_evento).toLocaleString('pt-BR')}</p>
                <p><strong>Status: ${i.status}</strong></p>
                
                <div class="card-actions">
                    <button class="checkin-btn" 
                            data-insc-id="${i.id}" 
                            data-event-name="${i.evento}"
                            ${!canCheckin ? 'disabled' : ''}>
                        Fazer Check-in
                    </button>
                    <button class="cancel-btn" 
                            data-insc-id="${i.id}" 
                            ${!canCancel ? 'disabled' : ''} 
                            style="background-color: ${!canCancel ? '#666' : '#dc3545'};">
                        Cancelar Inscrição
                    </button>
                </div>
            `;
            list.appendChild(li);
        });

        // Handler para Abrir Modal de Check-in
        document.querySelectorAll('.checkin-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const inscId = parseInt(btn.getAttribute('data-insc-id'), 10);
                const eventName = btn.getAttribute('data-event-name');
                
                // Preenche e abre o modal de código de check-in (checkin-modal)
                if (checkinModal) checkinModal.classList.remove('hidden');
                if (checkinModalEventName) checkinModalEventName.textContent = eventName;
                if (checkinInscricaoIdInput) checkinInscricaoIdInput.value = inscId;
                if (checkinCodeInput) checkinCodeInput.value = '';
                if (checkinErrorMsg) checkinErrorMsg.textContent = '';
            });
        });

        // Handler para Cancelar Inscrição
        document.querySelectorAll('.cancel-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (!confirm('Tem certeza que deseja cancelar esta inscrição?')) return;

                const inscId = parseInt(btn.getAttribute('data-insc-id'), 10);
                
                // COMENTÁRIO: LÓGICA MOCKADA: Substitua este bloco para um DELETE /api/inscricao/:id real.
                try {
                    // EX: await apiFetch('/api/inscricao/' + inscId, { method: 'DELETE' });
                    
                    alert(`Inscrição ${inscId} cancelada com sucesso (MOCK).`);
                    loadMyInscriptions(); // Recarrega para atualizar o status na tela
                    
                } catch (err) {
                    alert('Falha ao cancelar inscrição (MOCK): ' + (err.error || ''));
                }
            });
        });
    }

    // Lógica de submissão do modal de código de check-in (em minhas_inscricoes.html)
    if (codeCheckinForm) {
        codeCheckinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const inscId = parseInt(checkinInscricaoIdInput.value, 10);
            const authCode = checkinCodeInput.value.trim();
            
            // COMENTÁRIO: LÓGICA MOCKADA: Substitua este bloco para um POST /api/presenca/validate real.
            try {
                // EX: await apiFetch('/api/presenca/validate', { method: 'POST', body: JSON.stringify({ inscricao_id: inscId, codigo_autenticacao: authCode }) });
                
                // SIMULAÇÃO: Se o código for TESTE, simula sucesso
                if (authCode.toUpperCase() === 'TESTE') {
                    alert(`Check-in confirmado para inscrição ${inscId} (MOCK)!`);
                    if (checkinModal) checkinModal.classList.add('hidden');
                    loadMyInscriptions(); // Recarrega a lista
                } else {
                    checkinErrorMsg.textContent = 'Código inválido (MOCK). Use TESTE.';
                }
                
            } catch (err) {
                checkinErrorMsg.textContent = err.error || 'Erro no check-in (MOCK).';
            }
        });
    }


    // LÓGICA DA PÁGINA DE CERTIFICADOS
    if (validationForm) {
        validationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const authCode = document.getElementById('auth-code-input').value.trim();
            validationMessage.textContent = '';
            certificateResultDiv.classList.add('hidden');

            if (!authCode) {
                validationMessage.textContent = 'Por favor, insira o código de autenticação.';
                validationMessage.style.color = '#dc3545';
                return;
            }

            // COMENTÁRIO: LÓGICA MOCKADA: Substitua este bloco para um GET /api/certificados/validate/:codigo real.
            let r;
            try {
                // SIMULAÇÃO: Se o código for TESTE-123, simula sucesso
                if (authCode.toUpperCase() === 'TESTE-123') {
                     r = { data: { evento: 'Workshop de Refatoração', download_url: '#download-mock' } };
                } else {
                     throw { error: 'Código de autenticação inválido.' };
                }
                
                // Se a chamada for bem-sucedida (status 200 OK):
                certificateEventName.textContent = `Evento: ${r.data.evento}`;
                downloadLink.href = r.data.download_url;
                
                validationMessage.textContent = 'Certificado encontrado e validado. Download liberado!';
                validationMessage.style.color = 'var(--primary-color)';
                certificateResultDiv.classList.remove('hidden');

            } catch (err) {
                const errorMsg = err.error || 'Código de autenticação inválido ou falha na comunicação (MOCK).';
                validationMessage.textContent = errorMsg;
                validationMessage.style.color = '#dc3545';
                console.error('Erro de validação de certificado:', err);
            }
        });
    }
    // ----------- FIM DA NOVA LÓGICA DE CERTIFICADO -----------


    // Inicializações por página
    if (document.getElementById('events-list')) loadEventos(); 
    if (document.getElementById('my-inscriptions-list')) loadMyInscriptions(); // ATIVADO AQUI
    if (document.getElementById('admin-content')) { /* loadAdminPage(); */ } // Para futura tela admin

    // Modais de fechamento
    if (registrationModal) {
      const closeModalButtons = registrationModal.querySelectorAll('.close-modal');
      closeModalButtons.forEach(b => b.addEventListener('click', () => registrationModal.classList.add('hidden')));
      registrationModal.addEventListener('click', (e) => { if (e.target === registrationModal) registrationModal.classList.add('hidden'); });
    }
    if (checkinModal) {
        const closeModalButtons = checkinModal.querySelectorAll('.close-modal');
        closeModalButtons.forEach(b => b.addEventListener('click', () => checkinModal.classList.add('hidden')));
        checkinModal.addEventListener('click', (e) => { if (e.target === checkinModal) checkinModal.classList.add('hidden'); });
    }
});