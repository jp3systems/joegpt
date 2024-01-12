# joegpt

joegpt is a simple project to create an openai chatGPT based chatbot.  It uses a basic chat interface, hosted on Netlify, which doubles as a progressive web app that can be installed on basically any platform (Window, Linux, Mac, ChromeOS, Android, and iOS).  The UI calls an AWS Lambda function with the context of the discussion and displays the response. The Lambda is a very basic Python function to act as a back end between the UI and the openai API. Since the openai Python module is not available by default on AWS Lambda, we need to create a "Lambda layer", i.e. bring your own module.  The end result is a personal chatGPT app that can be used anywhere.

## Requirements
1. AWS account to create and use Lambda
    - The free tier of Lambda is more than enough for this project
2. openai API account
    - This is a paid service but this project is fairly simple and the amount of tokes is low unless you really use it a lot
3. Web hosting for the UI
    - This is hosted on Netlify (highly recommended) but will work anywhere

## Setting up AWS Lambda

### Lambda console
1. In the Lambda console, select Create Function
2. Give the function a name and select Python 3.11 in the Runtime dropdown
3. Under Advanced settings, tick the box for Enable function URL
4. Select Create Function

### Update Functon URL to deal with CORS
1. Go to the Configuration -> Function URL -> Edit
2. Tick the box for: Configure cross-origin resource sharing (CORS)
3. Under Allow headers, add:
    - content-type
    - access-control-allow-origin

### Increase Lambda timeout
The default timeout for Lambda functions is 3 seconds, we will need more than that for most chatGPT responses. 
1. Go to the Configuration -> General configuration -> Edit
2. In the Timeout section, set the value to something like 1 minute and save

### Create environment variable for Openai api key
1. Go to the Configuration -> Environment variables -> Edit
2. Add a variable with Key named 'openai_api'
3. Put the api key in the Value field and save

### Create a Lambda layer
To use the openai python module in AWS Lambda, you need to create a Lambda layer. 
1. Create a folder to put a copy of the openai module into. In that folder, create a folder named 'python'
2. Install openai to that new folder
    - pip install openai --target path\to\python
3. Zip the python folder, name it something useful like openai_lambda.zip
4. In the Lambda console, go to Layer, then Create Layer, 
    - Give it a similarly useful name
    - Upload the zip you created
    - Select the version of python you used in Compatible runtime
    - Hit the Create button

Add the new layer to the Lambda by going to the Lambda page and scrolling to the bottom to the Layers section. 
1. Select Add a Layer
2. Coose Custom layers
3. In the Custom layers drop down, pick the layer that you created above 


## Citation
1. Chatbot interface was sourced from https://codepen.io/sajadhsm/pen/odaBdd and subsequently modified as needed
2. Instructions for creating a Lambda layer are taken from https://thedeveloperspace.com/how-to-invoke-openai-apis-from-aws-Lambda-functions/#Create_a_Lambda_Layer_for_OpenAI_Python_library
