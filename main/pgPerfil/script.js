
document.addEventListener('DOMContentLoaded', () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuarioLogado) {
    alert("Nenhum usuário logado encontrado.");
    window.location.href = "../login/index.html";
    return;
  }

  // Preenche os campos do formulário com os dados do usuário logado
  document.getElementById('name').value = usuarioLogado.usuario || '';
  document.getElementById('email').value = usuarioLogado.email || '';
  document.getElementById('cpf').value = usuarioLogado.cpf || '';
  document.getElementById('senha').value = usuarioLogado.senha || '';
  document.getElementById('bio').value = usuarioLogado.bio || '';

  // Evento de envio do formulário
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

      // Atualiza os dados no localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarios[indexUsuario]));

      alert("Perfil atualizado com sucesso!");
      location.reload();
    } else {
      alert("Usuário não encontrado.");
    }
  });
});
