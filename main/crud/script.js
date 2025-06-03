let editIndex = null;

document.addEventListener('DOMContentLoaded', () => {
  carregarUsuarios();

  document.getElementById('recordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const bio = document.getElementById('bio').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push({
      usuario: nome,
      email,
      cpf,
      senha,
      dataNascimento,
      bio
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
      <div><strong>CPF:</strong> ${user.cpf}</div>
      <div><strong>Data de Nascimento:</strong> ${user.dataNascimento}</div>
      <div><strong>Senha:</strong> ${user.senha ? '••••••••' : 'Não definida'}</div>
      <div><strong>Bio:</strong> ${user.bio || ''}</div>
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

  document.getElementById('edit-nome').value = user.usuario;
  document.getElementById('edit-email').value = user.email;
  document.getElementById('edit-cpf').value = user.cpf;
  document.getElementById('edit-senha').value = user.senha;
  document.getElementById('edit-dataNascimento').value = user.dataNascimento;
  document.getElementById('edit-bio').value = user.bio;

  editIndex = index;

  document.getElementById('modal').classList.remove('hidden');
}

function salvarEdicao() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  usuarios[editIndex] = {
    usuario: document.getElementById('edit-nome').value,
    email: document.getElementById('edit-email').value,
    cpf: document.getElementById('edit-cpf').value,
    senha: document.getElementById('edit-senha').value,
    dataNascimento: document.getElementById('edit-dataNascimento').value,
    bio: document.getElementById('edit-bio').value
  };

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  fecharModal();
  carregarUsuarios();
}

function fecharModal() {
  document.getElementById('modal').classList.add('hidden');
  editIndex = null;
}
