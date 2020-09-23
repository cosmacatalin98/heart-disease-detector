# Heart Disease Detector (HeartDet)

HeartDet was created as a research project during my internship within [The Technical University of Cluj-Napoca, Faculty of Computer Science](https://www.utcluj.ro/en/). 

The application's purpose is to detect the presence of a heart disease based on a patient's medical data by using a pretrained and preconfigured neural network, however it can also be used for creating and training your own neural network.

It's a web application built using [Angular](https://angular.io/) that runs a python script on the backend. 

## Installation

The application is currently deployed on a [Microsoft Azure](https://azure.microsoft.com/en-us/) server and can be accessed by [this link](https://heart-disease-detector.azurewebsites.net/) so all you have to do is to install a python based machine learning environment that can run the neural network.
There is a step by step guide provided by Towards Data Science that gets you through the [process](https://towardsdatascience.com/installing-keras-tensorflow-using-anaconda-for-machine-learning-44ab28ff39cb).

>Before you move on to the next step make sure to update your GPU's driver to the latest version or you could encounter issues when trying to run the script.

After you're done installing your python based environment you need the **heart.csv** file that contains the medical data used to train your neural network so that you can make predictions on new data. The file can be downloaded from [here](https://www.kaggle.com/johnsmith88/heart-disease-dataset?select=heart.csv) or you can get it from the repository .


Next you need to download the **main.py** file from the repository which runs the script required for the neural network.

>Both the heart.csv and main.py  need to be in the same directory otherwise the script won't be able to open the .csv file.

Finally go ahead and open Anaconda Navigator , switch to your pythonGPU environment and run Spyder (this might take a few moments), once loaded open the folder that contains both the **main.py** and **heart.csv** files and open **main.py** and run it.

Now you're ready to use it !


## Usage
To access the application use [this link](https://heart-disease-detector.azurewebsites.net/).
Once you open it you have two options : either sign in as a doctor and get a heart disease diagnosis based on a patient's medical record either you can access it as a scientist in which case you'll be able to create and train your own neural network.

>In order to be able to use the application as a doctor you first need to sign in as a scientist and then create and train a neural network with the parameters presented in the Scientist section.

### Scientist

Sign in using the credentials :
>Username : scientist  
Password : pass123

Once logged in you will be greeted by the page below :

Here you can create and train your own neural network which is fully configurable.

### Doctor

Sign in using the credentials :
>Username : doctor  
Password : pass123

Once logged in you will be greeted by the page below :

Here you can enter a patient's medical record and receive a diagnosis based on it.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
## License
[MIT](https://choosealicense.com/licenses/mit/)

