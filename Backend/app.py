from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

last_submission = {}

@app.route('/api/submit', methods=['POST'])
def submit():
    try:
        # Extract simple fields
        data = {key: request.form.get(key) for key in request.form if not key.startswith('hobbies_')}

        # Extract hobbies
        hobbies = []
        for key in request.form:
            if key.startswith('hobbies_') and request.form.get(key) == 'true':
                hobbies.append(key.replace('hobbies_', ''))
        data['hobbies'] = hobbies

        # Handle file upload
        file = request.files.get('profilePic')
        if file:
            filepath = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(filepath)
            data['profilePicUrl'] = f'/uploads/{file.filename}'

        global last_submission
        last_submission = data

        return jsonify({"status": "success"}), 200

    except Exception as e:
        print("Error during submission:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/api/details', methods=['GET'])
def get_details():
    global last_submission
    return jsonify(last_submission)

if __name__ == '__main__':
    app.run(debug=True, port=5000)