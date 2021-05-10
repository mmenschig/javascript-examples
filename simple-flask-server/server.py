from random import choice
import time
from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

# Returns a random entry from a list of available usernames
def randomName():
    names = ['randolph', 'josefina', 'rutger', 'joseph', 'jeremiah', 'jebediah', 'sophia', 'jessica']
    return choice(names)

def sumValues(val1, val2):
    return val1 + val2

@app.route('/simplePost', methods=['POST'])
def sample():
    time.sleep(2)
    requestData = request.json

    if not requestData['username']:
        username = randomName()
    else:
        username = requestData['username']

    sumResult = sumValues(requestData['value1'], requestData['value2'])
    return {"result": sumResult, "username": username}

if __name__ == "__main__":
  app.run(debug=True)