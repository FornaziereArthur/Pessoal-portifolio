document.addEventListener('DOMContentLoaded', function() {
    // Menu móvel toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Rolagem suave para âncoras internas
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Destacar item de menu ao rolar
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('ativo');
            if (item.getAttribute('href') === current) {
                item.classList.add('ativo');
            }
        });
    });

    // Envio do formulário de contato
    const formulario = document.getElementById('contato-form');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores dos campos
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Validação simples
            if (!nome || !email || !assunto || !mensagem) {
                alert('Por favor, preencha todos os campos do formulário.');
                return;
            }
            
            try {
                // Abrir cliente de email do usuário com os campos preenchidos
                const corpoEmail = `Olá, me chamo ${nome}!\n\n${mensagem}\n\nMeu contato é: ${email}`;
                const mailtoLink = `mailto:isabellesm04@gmail.com?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`;
                
                window.location.href = mailtoLink;
                
                // Resetar formulário após um breve delay
                setTimeout(() => {
                    formulario.reset();
                }, 500);
            } catch (error) {
                console.error('Erro ao tentar abrir o cliente de email:', error);
                alert('Houve um problema ao tentar enviar o email. Por favor, tente entrar em contato diretamente pelo email: isabellesm04@gmail.com');
            }
        });
    }
    
    // Botão para adicionar classe ativo na navegação móvel
    const addEstiloAtivo = () => {
        // Adicione classe 'ativo' ao link correspondente à seção visível
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('nav a[href="#' + sectionId + '"]').classList.add('ativo');
            } else {
                document.querySelector('nav a[href="#' + sectionId + '"]').classList.remove('ativo');
            }
        });
    };

    // Chamar a função quando a página carregar
    addEstiloAtivo();
    
    // Efeito de revelação ao scroll
    const revelarElementos = () => {
        const elementos = document.querySelectorAll('.item-formacao, .item-experiencia, .item-projeto, .curso');
        const windowHeight = window.innerHeight;
        
        elementos.forEach(elemento => {
            const elementoPos = elemento.getBoundingClientRect().top;
            const elementoVisible = 150;
            
            if (elementoPos < windowHeight - elementoVisible) {
                elemento.classList.add('visivel');
            }
        });
    };
    
    // Adicionar classe CSS aos elementos
    document.querySelectorAll('.item-formacao, .item-experiencia, .item-projeto').forEach(item => {
        item.classList.add('fade-in');
    });
    
    // Animação para os itens de formação e cursos
    const animarFormacaoCursos = () => {
        // Resetar animações se os elementos estiverem fora da viewport
        const formacaoSection = document.getElementById('formacao');
        const resetarAnimacoes = () => {
            if (formacaoSection.getBoundingClientRect().top > window.innerHeight) {
                document.querySelectorAll('.formacao-item-animado, .curso-animado').forEach(item => {
                    item.style.opacity = '0';
                    item.style.animation = 'none';
                });
            }
        };

        // Ativar animações quando entrarem na viewport
        const ativarAnimacoes = () => {
            if (formacaoSection.getBoundingClientRect().top < window.innerHeight - 100) {
                document.querySelectorAll('.formacao-item-animado, .curso-animado').forEach(item => {
                    item.style.animation = '';
                });
            }
        };

        resetarAnimacoes();
        ativarAnimacoes();
    };
    
    // Animação para os itens de projeto
    const animarProjetos = () => {
        // Resetar animações se os elementos estiverem fora da viewport
        const projetosSection = document.getElementById('projetos');
        const resetarAnimacoes = () => {
            if (projetosSection.getBoundingClientRect().top > window.innerHeight) {
                document.querySelectorAll('.projeto-animado').forEach(item => {
                    item.style.opacity = '0';
                    item.style.animation = 'none';
                });
            }
        };

        // Ativar animações quando entrarem na viewport
        const ativarAnimacoes = () => {
            if (projetosSection.getBoundingClientRect().top < window.innerHeight - 100) {
                document.querySelectorAll('.projeto-animado').forEach(item => {
                    item.style.animation = '';
                });
            }
        };

        resetarAnimacoes();
        ativarAnimacoes();
    };
    
    // Executar funções ao carregar e ao rolar
    window.addEventListener('scroll', revelarElementos);
    window.addEventListener('scroll', animarFormacaoCursos);
    window.addEventListener('scroll', animarProjetos);
    revelarElementos();
    animarFormacaoCursos();
    animarProjetos();

    // Criar uma imagem de placeholder para o perfil, caso a imagem principal falhe
    const imgPerfil = document.querySelector('.foto-perfil img');
    
    if (imgPerfil) {
        imgPerfil.addEventListener('error', function() {
            // Se a imagem não carregar, usar um placeholder com as iniciais
            const nome = document.querySelector('.info-texto h1').textContent;
            const iniciais = nome.split(' ').map(n => n[0]).join('');
            
            this.style.display = 'none';
            const divPlaceholder = document.createElement('div');
            divPlaceholder.classList.add('placeholder-iniciais');
            divPlaceholder.textContent = iniciais;
            
            this.parentNode.appendChild(divPlaceholder);
        });
    }
});

// Adicionar uma regra CSS para o placeholder de iniciais
if (!document.getElementById('placeholderStyle')) {
    const style = document.createElement('style');
    style.id = 'placeholderStyle';
    style.textContent = `
        .placeholder-iniciais {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background-color: var(--cor-secundaria);
            color: var(--cor-fundo);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 3rem;
            font-weight: bold;
            border: 5px solid var(--cor-fundo);
            box-shadow: var(--sombra-suave);
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .visivel {
            opacity: 1;
            transform: translateY(0);
        }
        
        nav a.ativo {
            color: var(--cor-primaria);
            font-weight: 600;
        }
        
        nav a.ativo::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
} 