document.addEventListener('DOMContentLoaded', () => {
    const btnToLogin = document.querySelector('.entrarConta');
    const btnToRegister = document.querySelector('.criarConta');
    const loginForm = document.querySelector('.login');
    const cadastroForm = document.querySelector('.cadastro');
    const logarBtn = document.getElementById('finalizaloguin');

    // Troca para o formulário de login
    btnToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        cadastroForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    // Troca para o formulário de cadastro
    btnToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        cadastroForm.classList.add('active');
    });

    // Redireciona para a página principal ao clicar em "logar"
    logarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Aqui você pode redirecionar para sua home
        window.location.href = "pagina-principal.html"; // troque pelo nome real do seu arquivo
    });
});