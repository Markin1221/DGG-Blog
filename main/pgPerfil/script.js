document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuario) {
    alert("Nenhum usuário logado encontrado.");
    window.location.href = "../login/index.html";
    return;
  }

  // Exibir informações no perfil
  document.getElementById('nome-usuario').innerText = usuario.usuario;
  document.getElementById('email-usuario').innerText = usuario.email;
  document.getElementById('bio-usuario').innerText = "Sua bio aqui..."; // Você pode salvar uma bio futuramente

  // Preencher os inputs com os mesmos dados
  document.getElementById('name').value = usuario.usuario;
  document.getElementById('email').value = usuario.email;
  document.getElementById('bio').value = "Sua bio aqui..."; // Personalizável
});
