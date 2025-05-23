// trocar de loin pra cadastro
function mostrarCadastro() {
  document.getElementById('login-form').classList.remove('visivel');
  document.getElementById('login-form').classList.add('oculto');
  document.getElementById('cadastro-form').classList.remove('oculto');
  document.getElementById('cadastro-form').classList.add('visivel');
}

// trocar de cadastro pra login
function mostrarLogin() {
  document.getElementById('cadastro-form').classList.remove('visivel');
  document.getElementById('cadastro-form').classList.add('oculto');
  document.getElementById('login-form').classList.remove('oculto');
  document.getElementById('login-form').classList.add('visivel');
}

function salvarUsuario(usuarioObj) {
  // converte string em array
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  usuarios.push(usuarioObj);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  return true;
}

// busca usuarios
function buscarUsuarios() {
  return JSON.parse(localStorage.getItem('usuarios')) || [];
}

function entrar() {
  const usuarioInput = document.querySelector('#login-form input[name="usuario"]').value.trim();
  const senhaInput = document.querySelector('#login-form input[name="senha"]').value;

  if (!usuarioInput || !senhaInput) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
}

function cadastrar() {
  const cadastroForm = document.querySelector('#cadastro-form form');
  const usuario = cadastroForm.usuario.value.trim();
  const senha = cadastroForm.senha.value;
  const cpf = cadastroForm.cpf.value.trim();
  const email = cadastroForm.email.value.trim();
  const dataNascimento = cadastroForm.dataNascimento.value;

  if (!usuario || !senha || !cpf || !email || !dataNascimento) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const novoUsuario = {
    usuario,
    senha,
    cpf,
    email,
    dataNascimento
  };

  const sucesso = salvarUsuario(novoUsuario);
  if (sucesso) {
    alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");
    cadastroForm.reset();
    mostrarLogin();
  }
}
document.addEventListener('DOMContentLoaded', function() {
  const cadastroForm = document.querySelector('#cadastro-form form');
  cadastroForm.addEventListener('submit', function(event) {
    event.preventDefault();
    cadastrar();
  });
});
function entrar() {
  window.location.href = "../index.html"; // Altere o nome conforme sua estrutura
}

