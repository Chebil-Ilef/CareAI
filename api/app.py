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

@cross_origin()
@app.route('/parkinson', methods=['GET', 'POST'])
def parkinson():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            try:
                # Read the uploaded CSV file into a pandas DataFrame
                df = pd.read_csv(file)
                # Perform predictions on the data
                predictions = parkinson_model.predict(df)
                # Convert predictions to human-readable format
                for p in predictions:
                    if p == 0 :
                        result = "The person does not have Parkinson's disease" 
                    else :
                        result = "The person has Parkinson's" 
                return jsonify({'result': result})
            except Exception as e:
                return jsonify({'error': str(e)})
        return jsonify({'error': 'No file selected!'})
    return render_template('Parkinson/index.html')



# Heart Disease Prediction
heart_model = pickle.load(open('./compressed_models/heart_disease/heart-disease-model.pkl','rb'))

@cross_origin()
@app.route('/heart', methods=['GET', 'POST'])
def heart():
    if request.method == 'POST':
        try:
            data = request.json
            print(data)
            age = int(data['age'])
            sex = int(data['sex'])
            chest_pain_type = int(data['chest_pain_type'])
            resting_blood_pressure = int(data['resting_blood_pressure'])
            serum_cholesterol = int(data['serum_cholesterol'])
            fasting_blood_sugar = int(data['fasting_blood_sugar'])
            resting_ecg = int(data['resting_ecg'])
            max_heart_rate = float(data['max_heart_rate'])
            exercise_angina = int(data['exercise_angina'])
            oldpeak = float(data['oldpeak'])
            slope = int(data['slope'])
            num_vessels = int(data['num_vessels'])
            thal = int(data['thal'])
            
            # Prepare the input data for prediction
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
            result = "Heart Disease Detected" if prediction == 1 else "No Heart Disease Detected"
            return jsonify({'result': result})
        
        except Exception as e:
            return jsonify({'error': str(e)}), 400  # Bad Request
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
            print("class",predicted_class)
            return jsonify({'result': predicted_class})

        else:
            return jsonify({'error': 'No file selected!'})

    return render_template('Alzheimers/index.html')


if __name__ == '__main__':
    app.run(debug=True)