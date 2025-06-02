document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const logadoElement = document.getElementById('logado');

    if (usuarioLogado && logadoElement) {
        logadoElement.innerHTML = `
            <li id="logado">
                <a href="./pgPerfil/index.html">
                    <i class="fa-solid fa-user"></i> ${usuarioLogado.usuario}
                </a>
            </li>
        `;
    } else if(logadoElement) {
        logadoElement.innerHTML = `
            <li id="logado">
                <a href="./pgPerfil/index.html">
                    <i class="fa-solid fa-user"></i> Login
                </a>
            </li>
        `;
    }
});
function abrirCriarPost(){
    window.location.href = "./posts/CriarPosts.html";
}