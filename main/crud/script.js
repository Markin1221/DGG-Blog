document.addEventListener('DOMContentLoaded', () => {
  carregarUsuarios();

  document.getElementById('recordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push({
      usuario: nome,
      email: email,
      bio: bio || '',
      senha: senha || '',
      cpf: cpf || '',
      dataNascimento: ''
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    e.target.reset();
    carregarUsuarios();
  });
});

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
      <div><strong>CPF:</strong> ${user.cpf || 'Não informado'}</div>
      <div><strong>Senha:</strong> ${user.senha ? '••••••••' : 'Não definida'}</div>
      <div class="buttons">
        <button onclick="editarUsuario(${index})">Editar</button>
        <button onclick="removerUsuario(${index})">Remover</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

function removerUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.splice(index, 1);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  carregarUsuarios();
}

function editarUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const user = usuarios[index];

  const novoNome = prompt("Editar nome:", user.usuario);
  const novoEmail = prompt("Editar email:", user.email);
  const novaBio = prompt("Editar bio:", user.bio || '');
  const novoCPF = prompt("Editar CPF:", user.cpf || '');
  const novaSenha = prompt("Editar senha:", user.senha || '');

  if (novoNome && novoEmail) {
    usuarios[index].usuario = novoNome;
    usuarios[index].email = novoEmail;
    usuarios[index].bio = novaBio;
    usuarios[index].cpf = novoCPF;
    usuarios[index].senha = novaSenha;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
  }
}
