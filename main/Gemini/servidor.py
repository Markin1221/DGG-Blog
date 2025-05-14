from flask import Flask, jsonify
from flask_cors import CORS
from google import genai

post = "mano meu dia foi muito bom, corri muito de carro"
client = genai.Client(api_key="vai gerar uma pra ti corno")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/comentarioIA', methods=['GET'])
def comentarioIA():
        # Gera o conteúdo com a API
        FanComent = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"{post} responda com um comentário de fã número um"
        )

        # Extraindo o texto da resposta
        comentario = FanComent.candidates[0].content.parts[0].text
        print("Comentário Gerado:", comentario)

        return jsonify({"comentarioFan": comentario}), 200

@app.route('/api/comentarioIA2', methods=['GET'])
def comentarioIA2():
       
        FanComent = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"{post} responda com um comentário de um hater"
        )

        
        comentario = FanComent.candidates[0].content.parts[0].text
        print("Comentário Gerado:", comentario)

        return jsonify({"comentarioHater": comentario}), 200
    
    
    
@app.route('/api/comentarioIA3', methods=['GET'])
def comentarioIA3():
       
        FanComent = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"{post} responda com um comentário de uma mulher que o ama e apoia ele totalmente"
        )

        
        comentario = FanComent.candidates[0].content.parts[0].text
        print("Comentário Gerado:", comentario)

        return jsonify({"comentarioAmor": comentario}), 200
if __name__ == '__main__':
    app.run(debug=True)
