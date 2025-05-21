from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

@app.route('/receive', methods=['POST'])
def receive_data():
    data = request.json
    message = data.get("message", "Nada recebido")
    print(f"Recebido do JS: {message}")
    return jsonify({"status": "Recebido", "message": message})

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
