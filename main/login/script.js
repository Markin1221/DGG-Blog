const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loguinBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loguniBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

