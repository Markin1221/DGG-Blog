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
        <div class="imagem maisPoLado">
          <img src="${posts[identificador].imagem}" alt="Imagem do Post"> 
        </div>
        <div class="conteudo">
          <p class="comentarioInput">${posts[identificador].conteudo}</p>
        </div>
        <div class="botoesComentarios">
           <button id="btnComentarios" onclick="mostrarComentarios(); comentarios();">Mostrar Comentários</button>
        </div>
        <div class="maisPoLado" id="abaComentarios" style="display: none;">
          <div class="comentarios" id="comentarios">
            <h2>Comentários</h2>
            <hr>
            <div class="resposta" id="comentario">x</div>
            <hr>
            <div class="respostaHater" id="comentario">x</div>
            <hr>
            <div class="respostaAmor" id="comentario">x</div>
            <hr>
            <div class="respostaFilosofo" id="comentario">x</div>
            <hr>
            <div class="comentar">
            <input id="comentarioInput" type="text" placeholder="Comentar...">
            <button onclick="comentar()">Enviar</button>
          </div> 
          </div>
      </div>  
    `;
  });
  
function mostrarComentarios() {
  const aba = document.getElementById('abaComentarios');
  const btn = document.getElementById('btnComentarios');

  aba.style.display = 'block';
  btn.style.display = 'none';
}
