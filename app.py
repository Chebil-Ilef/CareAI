from flask import Flask, render_template, request
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import pickle

app = Flask(__name__)
scaler = MinMaxScaler() 
model = pickle.load(open('./compressed_models/parkinson_classifier_model.pkl','rb'))

@app.route('/')
def upload_form():
    return render_template('upload.html')

@app.route('/', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file:
        # Read the uploaded CSV file into a pandas DataFrame
        df = pd.read_csv(file)
        print(df)
        numpy_array = df.to_numpy()
        input_data_reshaped = numpy_array.reshape(1,-1)
        print(input_data_reshaped)
        # Perform predictions on the data
        predictions = model.predict(input_data_reshaped)
        # Convert predictions to human-readable format
        result = ["The Person does not have Parkinsons Disease" if p == 0 else "The Person has Parkinsons" for p in predictions]
        # Pass the result to the HTML page for display
        return render_template('upload.html', result=result)
    return "No file selected!"

if __name__ == '__main__':
    app.run(debug=True)
