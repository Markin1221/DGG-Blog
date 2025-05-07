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
        postElement.className = "postagem";
        postElement.innerHTML = `
            <h2>${post.titulo}</h2>
            <p>${post.conteudo}</p>
            <p><small>${post.data}</small></p>
        `;
        postContainer.appendChild(postElement);
    });
}