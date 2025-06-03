function filtrarPorNome() {
  const termoBusca = document.getElementById('buscaNome').value.toLowerCase();
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const lista = document.getElementById('recordList');
  
  lista.innerHTML = ''; 

  usuarios
    .filter(user => user.usuario.toLowerCase().includes(termoBusca))
    .forEach((user, index) => {
      const list = document.createElement('list');
      list.innerHTML = `
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
      lista.appendChild(list);
    });
}

carregarUsuarios();

filtrarPorNome();

