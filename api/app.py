import json
from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import pickle
from keras.models import load_model
import cv2
import io
import tensorflow as tf
from PIL import Image
from tensorflow import keras 
from keras.models import Sequential
from keras.layers import Dropout, GlobalAveragePooling2D, Flatten, BatchNormalization, Dense
from keras.applications import InceptionV3
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

# Home route
@app.route('/')
def home():
    return render_template('index.html')

# Parkinson's Disease Prediction
parkinson_model = pickle.load(open('./compressed_models/parkinson_disease/parkinson_classifier_model.pkl','rb'))

@app.route('/parkinson', methods=['GET', 'POST'])
def parkinson():  #matching the route parkinson in urlfor
    if request.method == 'POST':
        file = request.files['file']
        if file:
            # Read the uploaded CSV file into a pandas DataFrame
            df = pd.read_csv(file)
            numpy_array = df.to_numpy()
            input_data_reshaped = numpy_array.reshape(1,-1)
            # Perform predictions on the data
            predictions = parkinson_model.predict(input_data_reshaped)
            # Convert predictions to human-readable format
            result = ["The Person does not have Parkinson's Disease" if p == 0 else "The Person has Parkinson's" for p in predictions]
            # Pass the result to the HTML page for display
            return render_template('Parkinson/index.html', result=result)
        return "No file selected!"
    return render_template('Parkinson/index.html')


# Heart Disease Prediction
heart_model = pickle.load(open('./compressed_models/heart_disease/heart-disease-model.pkl','rb'))

@app.route('/heart', methods=['GET', 'POST'])
def heart(): 
    if request.method == 'POST':
        # Get form data
         age = int(request.form['age'])
         sex = int(request.form['sex'])
         chest_pain_type = int(request.form['chest_pain_type'])
         resting_blood_pressure = int(request.form['resting_blood_pressure'])
         serum_cholesterol = int(request.form['serum_cholesterol'])
         fasting_blood_sugar = int(request.form['fasting_blood_sugar'])
         resting_ecg = int(request.form['resting_ecg'])
         max_heart_rate = float(request.form['max_heart_rate'])
         exercise_angina = int(request.form['exercise_angina'])
         oldpeak = float(request.form['oldpeak'])
         slope = int(request.form['slope'])
         num_vessels = int(request.form['num_vessels'])
         thal = int(request.form['thal'])
         
         # Create a dictionary with input data
         input_data = {
            'age': age,
            'sex': sex,
            'trestbps': resting_blood_pressure,
            'chol': serum_cholesterol,
            'thalach': max_heart_rate,
            'oldpeak': oldpeak,
            'cp_1': 1 if chest_pain_type == 1 else 0,
            'cp_2': 1 if chest_pain_type == 2 else 0,
            'cp_3': 1 if chest_pain_type == 3 else 0,
            'fbs_1': fasting_blood_sugar,
            'restecg_1': 1 if resting_ecg == 1 else 0,
            'restecg_2': 1 if resting_ecg == 2 else 0,
            'exang_1': exercise_angina,
            'slope_1': 1 if slope == 1 else 0,
            'slope_2': 1 if slope == 2 else 0,
            'ca_1': 1 if num_vessels == 1 else 0,
            'ca_2': 1 if num_vessels == 2 else 0,
            'ca_3': 1 if num_vessels == 3 else 0,
            'ca_4': 1 if num_vessels == 4 else 0,
            'thal_1': 1 if thal == 1 else 0,
            'thal_2': 1 if thal == 2 else 0,
            'thal_3': 1 if thal == 3 else 0
        }

        # Create a DataFrame from the input data
         input_df = pd.DataFrame([input_data])

        # Make prediction
         prediction = heart_model.predict(input_df)

        # Return prediction result
         if prediction == 1:
              result = "Heart Disease Detected"
         else:
              result = "No Heart Disease Detected"
         return render_template('Heart/index.html', result=result)
    return render_template('Heart/index.html')

# Brain Tumor Prediction
brain_model = load_model('./compressed_models/brain_tumor/brain_model.h5')
print("brain_model loaded successfully!")

@cross_origin()
@app.route('/brain', methods=['GET', 'POST'])
def brain(): 
    if request.method == 'POST':
        imagefile = request.files.get('imagefile')

        if imagefile:
            # Read the image file
            image_data = imagefile.read()
            # Convert the image data into a PIL Image object
            image = Image.open(io.BytesIO(image_data))
            # Convert the PIL Image to OpenCV format (BGR)
            opencvImage = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            img = cv2.resize(opencvImage, (150, 150))
            img = img.reshape(1, 150, 150, 3)
            p = brain_model.predict(img)
            p = np.argmax(p, axis=1)[0]

            if p == 0:
                result = 'Glioma Tumor'
            elif p == 1:
                result = 'The model predicts that there is no tumor'
            elif p == 2:
                result = 'Meningioma Tumor'
            else:
                result = 'Pituitary Tumor'
            
            if p != 1:
                result = f'The Model predicts that it is a {result}'
            
            return jsonify({'result': result})

        return "No file selected!"
    return render_template('Brain/index.html')





loaded = load_model('./compressed_models/alzheimers/alzheimers_vgg.h5')

print("Alzheimer's model loaded successfully!")

def preprocess_image(image_path, target_size=(176, 176)):
    image_data = image_path.read()
    # Convert the image data into a PIL Image object
    image_pil = Image.open(io.BytesIO(image_data))
    # Convert the PIL Image to a numpy array
    image_np = np.asarray(image_pil)
    # Resize the image
    img = cv2.resize(image_np, target_size)
    # Convert the image to RGB (if it's not already)
    if len(img.shape) == 2:  # If the image is grayscale
        img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
    elif img.shape[2] == 1:  # If the image has only one channel
        img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
    # Normalize the pixel values
    preprocessed_img = img / 255.0
    # Expand dimensions to match the model input shape
    preprocessed_img = np.expand_dims(preprocessed_img, axis=0)
    return preprocessed_img


def predict_on_image(image_path, model):
    # Preprocess the image
    preprocessed_img = preprocess_image(image_path)
    # Perform prediction
    predictions = model.predict(preprocessed_img)
    # Get the predicted class label
    class_names = ['Mild Demented', 'Moderate Demented', 'Non Demented', 'Very Mild Demented']
    predicted_class = class_names[np.argmax(predictions)]
    return predicted_class

@cross_origin()
@app.route('/alzheimers', methods=['GET', 'POST'])
def alzheimers(): 
    if request.method == 'POST':
        image = request.files.get('image')

        if image:
            # Perform prediction
            predicted_class = predict_on_image(image, loaded)
            return jsonify({'result': predicted_class})

        return "No file selected!"
    return render_template('Alzheimers/index.html')


if __name__ == '__main__':
    app.run(debug=True)