function mostrarCadastro() {
  const loginForm = document.getElementById("login-form");
  const cadastroForm = document.getElementById("cadastro-form");

  // some com o login com fadeOut
  loginForm.style.animation = "fadeOut 0.4s ease forwards";

  setTimeout(() => {
    loginForm.classList.remove("visivel");
    loginForm.classList.add("oculto");

    cadastroForm.classList.remove("oculto");
    cadastroForm.classList.add("visivel");
    cadastroForm.style.animation = "fadeIn 0.4s ease forwards";
  }, 400);
}

function mostrarLogin() {
  const loginForm = document.getElementById("login-form");
  const cadastroForm = document.getElementById("cadastro-form");

  // some com o cadastro com fadeOut
  cadastroForm.style.animation = "fadeOut 0.4s ease forwards";

  setTimeout(() => {
    cadastroForm.classList.remove("visivel");
    cadastroForm.classList.add("oculto");

    loginForm.classList.remove("oculto");
    loginForm.classList.add("visivel");
    loginForm.style.animation = "fadeIn 0.4s ease forwards";
  }, 400);
}
function entrar(event) {
  event.preventDefault()
  // Aqui você pode colocar validação se quiser
  window.location.href = "../index.html"; // Altere o nome conforme sua estrutura
}