document.addEventListener('DOMContentLoaded', () => {
  carregarUsuarios();

  document.getElementById('recordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Adiciona como novo usuário genérico (sem login)
    usuarios.push({
      usuario: nome,
      email: email,
      bio: bio || '',
      senha: '', // opcional
      cpf: '',
      dataNascimento: ''
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    e.target.reset();
    carregarUsuarios();
  });
});

// Carrega e exibe todos os usuários
function carregarUsuarios() {
  const lista = document.getElementById('recordList');
  lista.innerHTML = '';

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  usuarios.forEach((user, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div><strong>Nome:</strong> ${user.usuario}</div>
      <div><strong>Email:</strong> ${user.email}</div>
      <div><strong>Bio:</strong> ${user.bio || ''}</div>
      <div class="buttons">
        <button onclick="editarUsuario(${index})">Editar</button>
        <button onclick="removerUsuario(${index})">Remover</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

// Remove um usuário
function removerUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.splice(index, 1);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  carregarUsuarios();
}

// Edita um usuário
function editarUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const user = usuarios[index];

  const novoNome = prompt("Editar nome:", user.usuario);
  const novoEmail = prompt("Editar email:", user.email);
  const novaBio = prompt("Editar bio:", user.bio || '');

  if (novoNome && novoEmail) {
    usuarios[index].usuario = novoNome;
    usuarios[index].email = novoEmail;
    usuarios[index].bio = novaBio;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
  }
}
