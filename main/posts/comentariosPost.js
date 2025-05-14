comentarios();

function comentarios(){
    fetch("http://127.0.0.1:5000/api/comentarioIA")
                .then(response => response.json())
                .then(data => {
                    console.log("Resposta recebida:", data);

                    // Verifica se há um erro
                    if (data.erro) {
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
