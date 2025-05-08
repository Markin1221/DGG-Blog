let posts = JSON.parse(localStorage.getItem("posts")) || [];
if (posts.length > 0) {
    console.log("ta aqui");
    console.log(posts);
    exibirPosts()
} else {
    console.log("nao ta aqui");
}

function SalvarPost() {
    document.getElementById("mensagem").textContent = "";

    let titulo = document.getElementById("titulo").value.trim();
    let conteudo = document.getElementById("conteudo").value.trim();

    
    let existe = posts.some(post => post.conteudo === conteudo);
    if (existe) {
        document.getElementById("mensagem").textContent = "Título já existe!";
        return;
    }

    if (titulo && conteudo) {
        let post = {
            titulo: titulo,
            conteudo: conteudo,
            data: new Date().toLocaleDateString()
        };
        posts.push(post); 
        localStorage.setItem("posts", JSON.stringify(posts));
        document.getElementById("mensagem").textContent = "Post salvo com sucesso!";
    } else {
        document.getElementById("mensagem").textContent = "Por favor, preencha título e conteúdo.";
    }
}
function exibirPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let postContainer = document.getElementById("posts");
    postContainer.innerHTML = ""; // Limpa o conteúdo atual

    posts.forEach((post, index) => {
        let postElement = document.createElement("div");
        postElement.className = "PostCont";
        postElement.setAttribute("data-index", index);
        postElement.addEventListener("click", abrirPost);
        postElement.innerHTML = `
            <h2>${post.titulo}</h2>
            <p>${post.conteudo}</p>
            <div class="ifoPost">
                <div class="bolinha"></div>
                <h6 class="name">Maria Eduarda •</h6>
                <h6 class="date">${post.data}</h6>
                <h6 class="hour">18:45</h6>
                <h6 class="coment"><i class="fa-solid fa-comment"></i>- 30</h6>
                <h6 class="like"><i class="fa-solid fa-heart"></i>- 150</h6>
            </div>
        `;
        postContainer.appendChild(postElement);
    });
    
}


function abrirPost(event) {
    let qualPost = event.currentTarget;
    let identificador = qualPost.getAttribute("data-index");
  
    // Salva o identificador no localStorage
    localStorage.setItem("postAtual", identificador);
  
    // Redireciona para a página onde 'postGrande' está
    window.location.href = "./posts/postsTeste.html";
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
    window.location.href = "./posts/postsTeste.html";
  
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
  }
  

function apagarPost() {
    
}
function debug(){
    console.log("voce clicou aqui")
}

function home() {
    window.location.href = "../index.html";
  }


/**mano,alguem tem que fazer essas funçoes ai ne */