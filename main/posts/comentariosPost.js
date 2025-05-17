gerarComentario()
comentarios();

async function gerarComentario() {
    const identificador = localStorage.getItem("postAtual");
    let posts = JSON.parse(localStorage.getItem("posts"));
   let  ConteudoComentario = posts[identificador].conteudo;


    console.log("Enviando comentário:", ConteudoComentario);  // Log do conteúdo enviado

    try {
        let response = await fetch("http://127.0.0.1:5000/receive", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ conteudo: ConteudoComentario })
        });

        if (response.ok) {
            console.log("Comentário enviado com sucesso.");
            document.getElementById("comentarioInput").value = "";
            atualizarComentarios();  // Atualiza os comentários após o envio
        }
    } catch (error) {
        console.error("Erro ao enviar comentário:", error);
    }
}




function comentarios(){
    
    fetch("http://127.0.0.1:5000/api/comentarioIA")
                .then(response => response.json())
                .then(data => {
                    console.log("Resposta recebida:", data);

                    // Verifica se há um erro
                    if (data.erro) {
                        document.querySelector(".resposta").innerHTML = ""
                        document.querySelector(".resposta").innerHTML = data.erro;
                    } else if (data.comentarioFan) {
                        document.querySelector(".resposta").innerHTML = data.comentarioFan;
                    } else {
                        document.querySelector(".resposta").innerHTML = "Nenhum comentário recebido.";
                    }
                })
                .catch(error => {
                    console.error("Erro na requisição:", error);
                    document.querySelector(".resposta").innerHTML = "Erro ao buscar dados.";
                });




                fetch("http://127.0.0.1:5000/api/comentarioIA2")
                .then(response => response.json())
                .then(data => {
                    console.log("Resposta recebida hater:", data);

                    // Verifica se há um erro
                    if (data.erro) {
                        document.querySelector(".respostaHater").innerHTML = ""
                        document.querySelector(".respostaHater").innerHTML = data.erro;
                    } else if (data.comentarioHater) {
                        document.querySelector(".respostaHater").innerHTML = data.comentarioHater;
                    } else {
                        document.querySelector(".respostaHater").innerHTML = "Nenhum comentário recebido.";
                    }
                })
                fetch("http://127.0.0.1:5000/api/comentarioIA3")
                .then(response => response.json())
                .then(data => {
                    console.log("Resposta recebida de seu amor:", data);

                    // Verifica se há um erro
                    if (data.erro) {
                        document.querySelector(".respostaAmor").innerHTML = ""
                        document.querySelector(".respostaAmor").innerHTML = data.erro;
                    } else if (data.comentarioAmor) {
                        document.querySelector(".respostaAmor").innerHTML = data.comentarioAmor;
                    } else {
                        document.querySelector(".respostaAmor").innerHTML = "Nenhum comentário recebido.";
                    }
                })
}
function comentar() {
    let comentario = document.getElementById("comentarioInput").value;
    let abaComentario = document.getElementById("comentarios");
    
     if (!comentario) {  // Verifica se está vazio
        console.warn("Comentário vazio.");
        return;  // Sai da função sem adicionar o comentário
    }
    let comentarioNovo = document.createElement("div");
    comentarioNovo.className = "resposta";
    comentarioNovo.id ="comentario"  
    comentarioNovo.innerHTML = `
        <hr>
        <div>${comentario}</div>
    `;
    
    abaComentario.appendChild(comentarioNovo);
    document.getElementById("comentarioInput").value = "";

    
}
