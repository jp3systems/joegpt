import json
import os
import openai

def lambda_handler(event, context):
    # print(event)
    # print(event['body'])

    msg = None
    openai.api_key = os.environ['openai_api']
    
    if msg is None:
        msg = json.loads(event['body'])

    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages = msg,
    temperature=1,
    # max_tokens=512,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    
    # print(response)
    
    return {
        'statusCode': 200,
        'headers': 
            {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
        'body': json.dumps(response['choices'][0]['message'])
    }
