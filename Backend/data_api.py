from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/countries', methods=['GET'])
def get_countries():
    countries = [
        "United States", "China", "Germany", "India", "Japan",
        "United Kingdom", "France", "Italy", "Canada", "Brazil"
    ]
    return jsonify(countries)

@app.route('/api/states', methods=['GET'])
def get_states():
    states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ]
    return jsonify(states)

if __name__ == '__main__':
    app.run(debug=True, port=5001)