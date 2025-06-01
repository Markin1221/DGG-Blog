
let posts = JSON.parse(localStorage.getItem("posts")) || [];
if (posts.length > 0) {
    console.log("ta aqui");
    console.log(posts);
    document.addEventListener("DOMContentLoaded", function () {
    exibirPosts();
});
} else {
    console.log("nao ta aqui");
}

function SalvarPost() {
    document.getElementById("mensagem").textContent = "";
    console.log("salvando post");

    let imagem = document.getElementById("imagem").files[0];
    if (imagem) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;  // Aqui está o base64Image sendo corretamente atribuído
            console.log("foi");
            
            let titulo = document.getElementById("titulo").value.trim();
            let conteudo = document.getElementById("conteudo").value.trim();

            // Verificando se o conteúdo já existe
            let existe = posts.some(post => post.conteudo === conteudo);
            if (existe) {
                document.getElementById("mensagem").textContent = "Título já existe!";
                return;
            }

            if (titulo && conteudo) {
                let post = {
                    titulo: titulo,
                    conteudo: conteudo,
                    imagem: base64Image,  // Agora a imagem base64 será salva corretamente
                    data: new Date().toLocaleDateString()
                };

                posts.push(post);  // Adicionando o post ao array
                localStorage.setItem("posts", JSON.stringify(posts));  // Salvando os posts no localStorage
                document.getElementById("mensagem").textContent = "Post salvo com sucesso!";
                exibirPosts(); 
                apagarConteudo();
            } else {
                document.getElementById("mensagem").textContent = "Por favor, preencha título e conteúdo.";
            }
        };
        
        // Lendo o arquivo como URL de dados (base64)
        reader.readAsDataURL(imagem);
    } else {
        // Caso a imagem não tenha sido selecionada
        document.getElementById("mensagem").textContent = "Por favor, selecione uma imagem.";
    }
    
}

function limitarFrase(frase, limite) {
  if (frase.length > limite) {
    return frase.substring(0, limite) + "...";
  }
  return frase;
}
function exibirPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let postContainer = document.getElementById("posts");
    
    

    posts.forEach((post, index) => {
      let postagem = document.createElement("div");
      postagem.className = "postagem";
      conteudo = limitarFrase(post.conteudo, 100);


        let postElement = document.createElement("div");
        postElement.className = "PostCont";
        postElement.setAttribute("data-index", index);
        postElement.addEventListener("click", abrirPost);
        postElement.innerHTML = `
        <div class="PostImg"><img src="${post.imagem}" alt=""></div>
            <h2>${post.titulo}</h2>
            <p>${conteudo}</p>
            <div class="ifoPost">
                <div class="bolinha"></div>
                <h6 class="name">markin •</h6>
                <h6 class="date">${post.data}</h6>
                <h6 class="hour">18:45</h6>
                <h6 class="coment"><i class="fa-solid fa-comment"></i>- 30</h6>
                <h6 class="like"><i class="fa-solid fa-heart"></i>- 150</h6>
            </div>
        `;
        postContainer.appendChild(postagem);
        postagem.appendChild(postElement);
    });
    
}


function abrirPost(event) {
    let qualPost = event.currentTarget;
    let identificador = qualPost.getAttribute("data-index");
  
    // Salva o identificador no localStorage
    localStorage.setItem("postAtual", identificador);
  
    // Redireciona para a página onde 'postGrande' está
    window.location.href = "./posts/PostAberto.html";
  }
  
function abrirPostt() {
    let posts = JSON.parse(localStorage.getItem("posts"));
  
    if (!posts) {
      console.warn("Nenhum post encontrado no localStorage.");
      return;
    }
  
    let qualPost = event.currentTarget;
    let identificador = parseInt(qualPost.getAttribute("data-index"), 10);
  
    if (isNaN(identificador) || !posts[identificador]) {
      console.warn("Identificador inválido ou post não encontrado.");
      return;
    }
    
  window.location.href = "./posts/PostAberto.html";
    
    let PostAberto = document.getElementById("postGrande");
  
    if (!PostAberto) {
      console.warn("Elemento com ID 'postGrande' não encontrado.");
      return;
    }
    PostAberto.innerHTML= ""
  
    PostAberto.innerHTML = `
      <div class="postCompleto">
        <div class="PostHeader">
          <div class="voltar" onclick="home()"><i class="fa-solid fa-arrow-left"></i></div>
          <h2>${posts[identificador].titulo}</h2>
        </div>
        <h2 class="dataPost">fodase</h2>
        <div class="donoPost">
          <img class="FotoUsuario" src="../imagens/usuario.jpg" alt="">
          <div class="nomeEArroba">
            <h2 class="nomeUsuario">socram</h2>
            <h2 class="arroba">@MarkinLindo</h2>
          </div>
        </div>
        <h2 class="dataPost">fodase</h2>
        <div class="conteudo">
          <p>${posts[identificador].conteudo}</p>
        </div>
        <h2 class="dataPost">fodase</h2>
        <div class="aba de comentarios">
          <div class="comentarios">
            <h2>Comentários</h2>
            <div class="resposta" id="comentario"></div>
            <div class="respostaHater" id="comentario"></div>
            <div class="respostaAmor" id="comentario"></div>
          </div>
          <div class="comentar">
            <input type="text" placeholder="Comentar...">
            <button onclick="debug()">Enviar</button>
          </div>

      </div>  
    `;
  }
  

function apagarPost() {
    
}
function debug(){
    console.log("voce clicou aqui")
}

function home() {
    window.location.href = "../index.html";
  }

function apagarConteudo(){
  document.getElementById("formulario").reset();
}

/**mano,alguem tem que fazer essas funçoes ai ne */