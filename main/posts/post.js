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

    
    let existe = posts.some(post => post.conteudo.trim().toLowerCase() === conteudo.toLowerCase());
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
