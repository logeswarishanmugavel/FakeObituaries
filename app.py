from flask import Flask, render_template, request, Response
from flask_cors import CORS, cross_origin

# App

app = Flask(__name__)
cors = CORS(app)

# Controllers.

@app.route('/', methods=['GET', 'POST', 'OPTIONS'])
def home():
    return render_template('/index.html')

# Default port:
if __name__ == '__main__':
    app.run()
