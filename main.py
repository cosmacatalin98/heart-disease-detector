# This scrip containts evrything needed to run the neural network

# Importing the required libraries and modules
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler 
from sklearn.model_selection import KFold

from keras.models import Sequential
from keras.layers import Dense
from keras.models import load_model

from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api
from flask_jsonpify import jsonify

# Using Flask framework to run the scrip on a development server
app = Flask(__name__)
api = Api(app)

CORS(app)

# This method receives a medical record belonging to a pacient and returns a 
# diagnosis based on it
found = False
def predict_diagnosis(d):
    global found
    found = False
    model = load_model('new_model')

    data = pd.read_csv('heart.csv')

    x = data.drop(['target'], axis=1)
    y = data['target']

    xTrain, xTest, yTrain, yTest = train_test_split(x, y, test_size = 0.2, random_state = 0)

    scaler = StandardScaler() 
    scaler.fit(xTrain)
    
    newData = scaler.transform(d)
    
    res = model.predict_classes(newData)
    
    if (res == [[1]]):
      found = True 

# This method creates a model with the received parameters
def create_model(in_dim, out_dim, last_afunction, cost_function, opt_alg, layers):
    model = Sequential()
    first_layer = False
    
    for i in layers:
        if first_layer:
            model.add(Dense(i["neurons"], activation=i["afunction"]))
        else:
            model.add(Dense(i["neurons"], input_dim = in_dim, activation=i["afunction"]))
            first_layer = True
        
    model.add(Dense(out_dim, activation = last_afunction))
    model.compile(loss = cost_function, optimizer = opt_alg, metrics=['accuracy'])
    model.save('new_model')


accuracy = 0.0
# This method trains and tests the created model using the Train-Test-Split method 
def train_test_split_model(testper, ep, bsize):
    global accuracy
    model = load_model('new_model')
    data = pd.read_csv('heart.csv')
    x = data.drop(['target'], axis=1)
    y = data['target']

    xTrain, xTest, yTrain, yTest = train_test_split(x, y, test_size = testper, random_state = 0)
    
    scaler = StandardScaler() 
    scaler.fit(xTrain)

    xTrainTrs = scaler.transform(xTrain)
    xTestTrs = scaler.transform(xTest)
  
    model.fit(xTrainTrs, yTrain, epochs = ep, batch_size = bsize)
    
    _, accuracy = model.evaluate(xTestTrs, yTest)
    model.save('new_model')
    return 'success'

# This method trains and tests the created model using the K-Fold Cross Validation method 
def k_fold_test(k, ep, bsize):
    global accuracy
    model = load_model('new_model')
    
    data = pd.read_csv('heart.csv')
    inputs = data.drop(['target'], axis=1)
    targets = data['target']

    scaler = StandardScaler() 
    scaler.fit(inputs)

    inputs = scaler.transform(inputs)

    acc_per_fold = []
    loss_per_fold = []

    kfold = KFold(n_splits=k, shuffle=True)

    fold_no = 1
    for train, test in kfold.split(inputs, targets):
    
      print('------------------------------------------------------------------------')
      print(f'Training for fold {fold_no} ...')

      model.fit(inputs[train], targets[train], epochs=ep, batch_size=bsize)
    
      scores = model.evaluate(inputs[test], targets[test], verbose=0)
      print(f'Score for fold {fold_no}: {model.metrics_names[0]} of {scores[0]}; {model.metrics_names[1]} of {scores[1]*100}%')
      acc_per_fold.append(scores[1] * 100)
      loss_per_fold.append(scores[0])

      fold_no = fold_no + 1
    
      print('------------------------------------------------------------------------')
      print('Score per fold')
    for i in range(0, len(acc_per_fold)):
      print('------------------------------------------------------------------------')
      print(f'> Fold {i+1} - Loss: {loss_per_fold[i]} - Accuracy: {acc_per_fold[i]}%')
      print('------------------------------------------------------------------------')
    print('Average scores for all folds:')
    print(f'> Accuracy: {np.mean(acc_per_fold)} (+- {np.std(acc_per_fold)})')
    print(f'> Loss: {np.mean(loss_per_fold)}')
    print('------------------------------------------------------------------------')
    accuracy = (np.mean(acc_per_fold)/100.0)
    model.save('new_model')

# Below are the endpoints for each HTTP request used by the front end
@app.route("/sendMedicalRecord", methods = ["POST"])
def sendMedicalRecord():
    req_data = request.get_json()
    age = req_data['age']
    sex = req_data['sex']
    cpt = req_data['cpt']
    rbp = req_data['rbp']
    sc = req_data['sc']
    fbs = req_data['fbs']
    rer = req_data['rer']
    mhra = req_data['mhra']
    eia = req_data['eia']
    oldpeak = req_data['oldpeak']
    tsotpe = req_data['tsotpe']
    nomv = req_data['nomv']
    thatl = req_data['thatl']
    newData = np.array([[age, sex, cpt, rbp, sc, fbs, rer, mhra, eia, oldpeak, tsotpe, nomv, thatl]])
    predict_diagnosis(newData)
    return 'success'

@app.route("/getDiagnosis", methods = ["GET"])
def getDiagnosis():
    global found
    if (found == False):
        return jsonify({'result': 'The pacient does not have a heart disease' , 'accuracy': '{0:.2f}'.format(accuracy*100)})
    else:
        return jsonify({'result': 'The pacient does have a heart disease', 'accuracy': '{0:.2f}'.format(accuracy*100)})

@app.route("/createModel", methods = ["POST"])
def createModel():
    req_data = request.get_json()
    in_dim = req_data['indim']
    out_dim = req_data['outdim']
    last_afunction = req_data['lastafunction']
    cost_function = req_data['costfunction']
    opt_alg = req_data['optalg']
    layers = req_data['layers']
    create_model(in_dim, out_dim, last_afunction, cost_function, opt_alg, layers)
    return 'success'

@app.route("/trainTestModel", methods = ["POST"])
def trainTestModel():
    req_data = request.get_json()
    testper = req_data['testper']
    epochs = req_data['epochs']
    bsize = req_data['bsize']
    train_test_split_model(testper, epochs, bsize)
    return 'success'

@app.route("/kfoldTestModel", methods = ["POST"])
def kfoldTestModel():
    req_data = request.get_json()
    k = req_data['k']
    epochs = req_data['epochs']
    bsize = req_data['bsize']
    k_fold_test(k, epochs, bsize)
    return 'success'

@app.route("/getAccuracy", methods = ["GET"])
def getAccuracy():
    return jsonify({'accuracy': '{0:.2f}'.format(accuracy*100)})
 
# Running the script locally on a development server
if __name__ == '__main__':
   app.run(port=5002)
