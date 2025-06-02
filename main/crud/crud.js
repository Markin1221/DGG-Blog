function mostrarCadastro() {
  document.getElementById('login-form').classList.remove('visivel');
  document.getElementById('login-form').classList.add('oculto');
  document.getElementById('cadastro-form').classList.remove('oculto');
  document.getElementById('cadastro-form').classList.add('visivel');
}

function mostrarLogin() {
  document.getElementById('cadastro-form').classList.remove('visivel');
  document.getElementById('cadastro-form').classList.add('oculto');
  document.getElementById('login-form').classList.remove('oculto');
  document.getElementById('login-form').classList.add('visivel');

  // Limpa mensagens de erro ao voltar para o login
  const mensagemErro = document.getElementById('mensagem-erro');
  if (mensagemErro) {
    mensagemErro.classList.add('oculto');
    mensagemErro.textContent = '';
  }
}

function salvarUsuario(usuarioObj) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.push(usuarioObj);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  return true;
}

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

  const usuarios = buscarUsuarios();
  const usuarioEncontrado = usuarios.find(usuario => usuario.usuario === usuarioInput && usuario.senha === senhaInput);

  if (usuarioEncontrado) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
    alert("Login realizado com sucesso!");
    window.location.href = "../perfil/perfil.html";
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

function cadastrar() {
  const cadastroForm = document.querySelector('#cadastro-form form');
  const usuario = cadastroForm.usuario.value.trim();
  const senha = cadastroForm.senha.value;
  const cpf = cadastroForm.cpf.value.trim();
  const email = cadastroForm.email.value.trim();
  const dataNascimento = cadastroForm.dataNascimento.value;
  const mensagemErro = document.getElementById('mensagem-erro');

  mensagemErro.classList.add('oculto');
  mensagemErro.textContent = '';

  if (!usuario || !senha || !cpf || !email || !dataNascimento) {
    mensagemErro.textContent = "Por favor, preencha todos os campos.";
    mensagemErro.classList.remove('oculto');
    return;
  }

  const usuarios = buscarUsuarios();
  const existeEmailOuSenha = usuarios.find(u => u.email === email || u.senha === senha);

  if (existeEmailOuSenha) {
    mensagemErro.textContent = "Email ou senha já cadastrados. Tente outros.";
    mensagemErro.classList.remove('oculto');
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

document.addEventListener('DOMContentLoaded', function () {
  const cadastroForm = document.querySelector('#cadastro-form form');
  cadastroForm.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrar();
  });

  const loginForm = document.querySelector('#login-form form');
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    entrar();
  });
});
