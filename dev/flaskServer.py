import pickle
import numpy as np 
from flask_cors import CORS
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model

app = Flask(__name__)

CORS(app,resources={r"/*":{"origins":"*"}})

model = load_model('saved_models/next_word.keras')
tokenizer = pickle.load(open('saved_models/token.pkl', 'rb'))
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        text = request.get_json()
        data = text.get('data', '')
        sequence = tokenizer.texts_to_sequences([data])
        sequence = np.array(sequence)
        preds = np.argmax(model.predict(sequence))
        predicted_word = ""
        for key, value in tokenizer.word_index.items():
            if value == preds:
                predicted_word = key
                break
        return jsonify(predicted_word)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
""" set FLASK_APP=flaskServer.py
$env:FLASK_APP = "flaskServer.py"
flask run """
