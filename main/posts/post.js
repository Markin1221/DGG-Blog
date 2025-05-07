let posts = JSON.parse(localStorage.getItem("posts")) || [];
if (posts.length > 0) {
    console.log("ta aqui");
    console.log(posts);
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

    posts.forEach(post => {
        let postElement = document.createElement("div");
        postElement.className = "PostCont";
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


function abrirPost() {
    
}

function apagarPost() {
    
}


/**mano,alguem tem que fazer essas funçoes ai ne */