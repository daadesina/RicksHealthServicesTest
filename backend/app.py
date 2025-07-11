from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open('./shifts.json', 'r') as file:
    shifts = json.load(file)

@app.route('/api/shifts', methods=['GET'])
def get_shifts():
    return jsonify(shifts)

@app.route('/api/shifts/<int:shift_id>', methods=['GET'])
def search_shift(shift_id):
    for shift in shifts:
        if shift_id == shift['id']:
            return jsonify(shift), 200
    return jsonify({
        "error": "Shift not found"
    }), 404

@app.route('/api/book/<int:shift_id>', methods=['POST'])
def book_shift(shift_id):
    for shift in shifts:
        if shift_id == shift['id']:
            if not shift['is_booked']:
                shift['is_booked'] = True

                with open ('./shifts.json', 'w') as file:
                    json.dump(shifts, file, indent=2)
                return jsonify({
                    "message": "Shift booked successfully"
                }), 200
            else:
                return jsonify({
                    "message": "Shift already booked"
                }), 400
    return jsonify({
        "error": f"Shift not found"
    }), 404

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # a dummy email and password
    my_email = "daadesina1@gmail.com"
    my_password = "adesina123"

    if email == my_email and password == my_password:
        return jsonify({
            "message": "Login successful"
        }), 200
    return jsonify({
        "error": "Incorrect email or password"
    }), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)