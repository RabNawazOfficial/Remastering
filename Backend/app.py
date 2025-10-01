from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

stored_data = {}

@app.route('/api/submit', methods=['POST'])
def submit():
    global stored_data
    stored_data = request.json
    return jsonify({'message': 'Data received'}), 200

@app.route('/api/details', methods=['GET'])
def details():
    return jsonify(stored_data), 200

if __name__ == '__main__':
    app.run(debug=True)