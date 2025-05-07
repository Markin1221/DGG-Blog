document.addEventListener("DOMContentLoaded", function () {
    exibirPosts();

    document.getElementById("formulario")?.addEventListener("submit", function(e) {
        e.preventDefault();
        let titulo = document.getElementById("titulo").value;
        let conteudo = document.getElementById("conteudo").value;

        if(titulo && conteudo){
            criarPost(titulo, conteudo);

        }
});
});

function criarPost(titulo, conteudo){
    let post = {
        titulo: titulo,
        conteudo: conteudo,
        data: new Date().toLocaleDateString()
    };
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    exibirPosts();


    document.getElementById("formulario").reset();
    document.getElementById("mensagem").textContent = "Post criado com sucesso!";

}

function exibirPosts(){
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let postContainer = document.getElementById("posts");
    postContainer.innerHTML = ""; // Limpa o conteúdo atual
    console.log(posts.value);

    posts.forEach(post => {
        let post = document.getElementById("post").cloneNode(true);
        postElement.innerHTML = `
            <h2>${post.titulo}</h2>
            <p>${post.conteudo}</p>
            <p><small>${post.data}</small></p>
        `;
        postContainer.appendChild(postElement);
    });
}
