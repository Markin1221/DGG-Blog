
document.addEventListener('DOMContentLoaded', () => {
    const btnToLogin = document.querySelector('.entrarConta');
    const btnToRegister = document.querySelector('.criarConta');
    const formSlider = document.getElementById('formSlider');
    const logarBtn = document.getElementById('finalizaloguin');

    btnToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        formSlider.style.transform = "translateX(-100%)";
    });

    btnToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        formSlider.style.transform = "translateX(0)";
    });

    logarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "../index.html";
    });
});