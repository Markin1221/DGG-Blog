document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuario) {
    alert("Nenhum usuário logado encontrado.");
    window.location.href = "../login/index.html"; // volta para login
    return;
  }

  // Preenche os dados no perfil
  document.getElementById('nome-usuario').innerText = usuario.usuario;
  document.getElementById('email-usuario').innerText = usuario.email;
  document.getElementById('bio-usuario').innerText = "Sua bio aqui..."; // pode adaptar futuramente

  // Preenche os inputs do formulário
  document.getElementById('name').value = usuario.usuario;
  document.getElementById('email').value = usuario.email;
  document.getElementById('bio').value = "Sua bio aqui...";
});
document.addEventListener('DOMContentLoaded', function () {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (usuarioLogado) {
    document.getElementById('nome-usuario').textContent = usuarioLogado.usuario;
    document.getElementById('email-usuario').textContent = usuarioLogado.email;
    document.getElementById('bio-usuario').textContent = usuarioLogado.bio || 'Sem bio';
    document.getElementById('cpf-usuario').textContent = usuarioLogado.cpf || '---';
    document.getElementById('senha-usuario').textContent = usuarioLogado.senha ? '••••••••' : '---';

    document.getElementById('name').value = usuarioLogado.usuario;
    document.getElementById('email').value = usuarioLogado.email;
    document.getElementById('bio').value = usuarioLogado.bio || '';
    document.getElementById('senha').value = usuarioLogado.senha || '';
  }

  const form = document.querySelector('.profile-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const novoNome = document.getElementById('name').value;
    const novoEmail = document.getElementById('email').value;
    const novaBio = document.getElementById('bio').value;
    const novaSenha = document.getElementById('senha').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const indexUsuario = usuarios.findIndex(u => u.email === usuarioLogado.email);

    if (indexUsuario !== -1) {
      usuarios[indexUsuario].usuario = novoNome;
      usuarios[indexUsuario].email = novoEmail;
      usuarios[indexUsuario].bio = novaBio;
      usuarios[indexUsuario].senha = novaSenha;

      // Atualiza localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      // Atualiza usuário logado
      const usuarioAtualizado = { ...usuarios[indexUsuario] };
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));

      alert("Perfil atualizado com sucesso!");
      location.reload();
    }
  });
});
ocument.addEventListener('DOMContentLoaded', () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuarioLogado) {
    alert("Nenhum usuário logado encontrado.");
    window.location.href = "../login/index.html";
    return;
  }

  // Preenche os dados exibidos no perfil (caso use em texto também)
  document.getElementById('nome-usuario').textContent = usuarioLogado.usuario;
  document.getElementById('email-usuario').textContent = usuarioLogado.email;
  document.getElementById('bio-usuario').textContent = usuarioLogado.bio || 'Sem bio';

  // Preenche os campos do formulário em modo de visualização
  document.getElementById('name').value = usuarioLogado.usuario || '';
  document.getElementById('email').value = usuarioLogado.email || '';
  document.getElementById('cpf').value = usuarioLogado.cpf || '';
  document.getElementById('senha').value = usuarioLogado.senha || '';
  document.getElementById('bio').value = usuarioLogado.bio || '';
});

  // Lida com envio do formulário
  const form = document.querySelector('.profile-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const novoNome = document.getElementById('name').value.trim();
    const novoEmail = document.getElementById('email').value.trim();
    const novoCPF = document.getElementById('cpf').value.trim();
    const novaSenha = document.getElementById('senha').value;
    const novaBio = document.getElementById('bio').value.trim();

    if (!novoNome || !novoEmail || !novaSenha || !novoCPF) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const indexUsuario = usuarios.findIndex(u => u.email === usuarioLogado.email);

    if (indexUsuario !== -1) {
      usuarios[indexUsuario] = {
        ...usuarios[indexUsuario],
        usuario: novoNome,
        email: novoEmail,
        cpf: novoCPF,
        senha: novaSenha,
        bio: novaBio,
      };

      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarios[indexUsuario]));

      alert("Perfil atualizado com sucesso!");
      location.reload();
    } else {
      alert("Usuário não encontrado.");
    }
  });

