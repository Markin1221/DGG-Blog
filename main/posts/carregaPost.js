document.addEventListener("DOMContentLoaded", () => {
    // Recupera o identificador do post
    const identificador = localStorage.getItem("postAtual");
  
    if (!identificador) {
      console.warn("Nenhum identificador encontrado.");
      return;
    }
  
    let posts = JSON.parse(localStorage.getItem("posts"));
  
    if (!posts || !posts[identificador]) {
      console.warn("Post não encontrado.");
      return;
    }
  
    let PostAberto = document.getElementById("postGrande");
  
    if (!PostAberto) {
      console.warn("Elemento 'postGrande' não encontrado.");
      return;
    }
  
    PostAberto.innerHTML = `
      <div class="postCompleto">
        <div class="PostHeader">
          <div class="voltar" onclick="window.history.back()"><i class="fa-solid fa-arrow-left"></i></div>
          <h2>${posts[identificador].titulo}</h2>
        </div>
        <div class="donoPost">
          <img class="FotoUsuario" src="../imagens/usuario.jpg" alt="">
          <div class="nomeEArroba">
            <h2 class="nomeUsuario">socram</h2>
            <h2 class="arroba">@MarkinLindo</h2>
          </div>
        </div>
        <div class="conteudo">
          <p>${posts[identificador].conteudo}</p>
        </div>
      </div>  
    `;
  });
  