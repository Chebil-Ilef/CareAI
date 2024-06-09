# CareAI: Multifaceted Healthcare Web Application 🩺

CareAI is a comprehensive healthcare web application built using React Js and Flask leveraging machine learning and deep learning technologies to tackle critical medical challenges. The application includes components for disease detection and prediction, as well as a healthcare chatbot using LLMs and CTransformers designed for medical staff interaction. 

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Model Training and Deployment](#model-training-and-deployment)
- [Development Tools](#development-tools)
- [Contributing](#contributing)
- [License](#license)

## Project Overview 🏥
CareAI provides a suite of predictive models for various diseases:
- **Skin Cancer Detection**
- **Brain Tumor Classification**
- **Alzheimer’s Stage Prediction**
- **Parkinson’s Disease Detection**

Additionally, CareAI includes a healthcare chatbot to assist medical staff with information and preliminary diagnosis.

## Features 🚀
- **Predictive Models**: Tailored machine learning models for specific diseases and deployed each in an online endpoint in Azure.
- **User-Friendly Web Interface**: Built with React for a seamless user experience.
- **Backend API**: Flask-based backend for model consumption and data processing.
- **Healthcare Chatbot**: AI-powered chatbot for medical staff interaction built using LLama2 and CTransformers
- **Cloud Deployment**: Models deployed on Azure ML Studio for scalability and accessibility.

## Installation 💻
### Prerequisites
- Node.js and npm (for frontend)
- Python 3.8 or later (for backend)
- Git

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/Chebil-Ilef/CareAI.git
   cd CareAI
   ```

2. **Frontend Setup**
   ```bash
   cd src
   npm install
   npm start
   ```

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate (on Windows: venv\Scripts\activate)
   pip install -r requirements.txt
   flask run
   ```

## Usage 🧑‍⚕️
1. **Frontend**: Access the React application via `http://localhost:3000`.
2. **Backend**: Ensure the Flask server is running at `http://localhost:5000`.

The application provides an intuitive interface for interacting with predictive models. Users can input data for disease prediction and receive results through the web interface.

## Model Training and Deployment 🤖
### Training And Datasets
1. **Skin Cancer Detection**: Use NumPy and Pandas for data cleaning and transformation.
     - Exploratory Data Analysis (EDA): Python with NumPy, Pandas
     - Deep Learning Framework: TensorFlow, Keras
     - Tested Algorithms: SVM,  EfficientNetB3
     - Selected Best Algorithm: EfficientNetB3
     - Dataset Link : https://www.kaggle.com/datasets/fanconic/skin-cancer-malignant-vs-benign
3. **Brain Tumor Classification**: Train models using Scikit-Learn for ML and TensorFlow/Keras for DL.
     - Deep Learning Framework: TensorFlow Keras
     - Python libraries for data preprocessing (NumPy, Pandas)
     - Tested Algorithms: CNN (Sequential ), EfficientNetB0
     - Selected Best Algorithm: EfficientNetB0
     - Dataset Link : https://www.kaggle.com/datasets/babaraliuser/brain-mri-images-dataset
4. **Parkinson’s Disease Detection**:
    - Machine Learning Framework: Scikit-learn, TensorFlow
    - Classification Algorithms: XGboost, Random Forest, K Neighbors    
    - Python libraries for data preprocessing (NumPy, Pandas)
    - Selected Best Algorithm:  XGboost, Random forest
    - Dataset Link : https://www.kaggle.com/competitions/amp-parkinsons-disease-progression-prediction/discussion/388322
5. **Alzheimer’s Stage Prediction**:
    - Exploratory Data Analysis (EDA): Python with NumPy, Pandas
    - Deep Learning Framework: TensorFlow , Keras
    - Tested Algorithms: InceptionV3, VGG19  (Transfert Learning)
    - Selected Best Algorithm: VGG19
    - Dataset Link : https://www.kaggle.com/datasets/tourist55/alzheimers-dataset-4-class-of-images

### Deployment
1. **Local Deployment**: We compressed the ML model in .pkl files and the DL models in .h5 files to be consumed by the backend of the app.
2. **Cloud Deployment**: We deployed the models as endpoints on Azure ML Studio following MLOps principles.

## Development Tools 🛠️
- **Frontend**: React, Redux, React Router, SASS, Styled Components, Material-UI
- **Backend**: Flask, Flask-RESTful, Flask-CORS
- **Machine Learning**: Scikit-Learn, TensorFlow/Keras, NumPy, Pandas
- **API Development**: Flask-RESTful
- **Data Storage**: Pickle, HDF5
- **Development Tools**: npm, virtualenv/venv, pip, VS Code
- **Version Control**: Git, GitHub

## Contributing 🤝
We welcome contributions to CareAI! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.


