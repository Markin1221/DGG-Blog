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
