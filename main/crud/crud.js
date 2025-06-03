let usuarioentrou = false;
let nomeusuario = "";

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
  const emailInput = document.querySelector('#login-form input[name="email"]').value.trim();
  const senhaInput = document.querySelector('#login-form input[name="senha"]').value;

  if (!emailInput || !senhaInput) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const usuarios = buscarUsuarios();
  const usuarioEncontrado = usuarios.find(usuario => usuario.email === emailInput && usuario.senha === senhaInput);

  if (usuarioEncontrado) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
    alert("Login realizado com sucesso!");
    window.location.href = "../index.html";
    usuarioentrou = true;
    nomeusuario = usuarioEncontrado.usuario;
    logado();

  } else {
    alert("Email ou senha incorretos.");
    usuarioentrou = false;
    nomeusuario = "";
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

  const cpfNumeros = cpf.replace(/\D/g, '');
  if (cpfNumeros.length !== 11) {
    mensagemErro.textContent = "CPF inválido. Deve conter exatamente 11 dígitos numéricos.";
    mensagemErro.classList.remove('oculto');
    return;
  }

  const usuarios = buscarUsuarios();
  const existeEmailOuCpf = usuarios.find(u => u.email === email || u.cpf === cpf);

  if (existeEmailOuCpf) {
    mensagemErro.textContent = "Email ou CPF já cadastrados. Tente outros.";
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

function logado() {
  console.log("Usuário logado:", nomeusuario);
  let logado = document.getElementById('logado');
  logado.innerHTML = `<li id="logado"><a href="login/index.html"><i class="fa-solid fa-user"></i>${nomeusuario}</a></li>`;
}
