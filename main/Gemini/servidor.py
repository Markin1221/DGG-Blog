from flask import Flask, jsonify, request
from flask_cors import CORS
from google import genai

client = genai.Client(api_key="AIzaSyA89C0Py5BYiF5ns3wEYN4hqVtf8FUYeWM")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, methods=["GET", "POST", "OPTIONS"])

@app.route('/receive', methods=['POST'])
def receive_data():
    data = request.json
    print("Dados recebidos pelo /receive:", data)  # Log dos dados recebidos

    if not data:
        print("Nenhum dado recebido.")
        return jsonify({"status": "Erro", "message": "Nenhum dado recebido"}), 400

    conteudo = data.get("conteudo", "Nada recebido")
    print(f"Atualizando o 'post' com: {conteudo}")

    global post
    post = conteudo

    # Gerar os comentários automaticamente quando o post for atualizado
    gerar_comentarios()

    return jsonify({"status": "Recebido", "message": conteudo}), 200


def gerar_comentarios():
    global post
    try:
        FanComent = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"{post} responda com um comentário de fã número um em 10 palavras"
        )
        haterComent = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"{post} responda com um comentário de um hater em 10 palavras"
        )
        amorComent = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"{post} responda com um comentário de uma mulher que o ama e apoia ele totalmente em 10 palavras"
        )

        # Armazenar os comentários em variáveis globais
        global fan_comment, hater_comment, amor_comment
        fan_comment = FanComent.candidates[0].content.parts[0].text
        hater_comment = haterComent.candidates[0].content.parts[0].text
        amor_comment = amorComent.candidates[0].content.parts[0].text

        print("Comentários atualizados com sucesso!")
        print(f"Fan: {fan_comment}")
        print(f"Hater: {hater_comment}")
        print(f"Amor: {amor_comment}")

    except Exception as e:
        print(f"Erro ao gerar comentários: {e}")


@app.route('/api/comentarioIA', methods=['GET'])
def comentarioIA():
    return jsonify({"comentarioFan": fan_comment}), 200


@app.route('/api/comentarioIA2', methods=['GET'])
def comentarioIA2():
    return jsonify({"comentarioHater": hater_comment}), 200


@app.route('/api/comentarioIA3', methods=['GET'])
def comentarioIA3():
    return jsonify({"comentarioAmor": amor_comment}), 200


# Inicializar variáveis globais
post = "Nenhum conteúdo recebido ainda."
fan_comment = ""
hater_comment = ""
amor_comment = ""


if __name__ == '__main__':
    app.run(debug=True)
