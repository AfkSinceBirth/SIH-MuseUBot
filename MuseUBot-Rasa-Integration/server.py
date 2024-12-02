from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def sessions():
    return render_template('index.html')

@socketio.on('user_message')
def handle_user_message(message):
    print('Received message:', message)
    response = requests.post('http://localhost:5005/webhooks/rest/webhook', json={"message": message})
    emit('bot_response', response.json())

if __name__ == '__main__':
    socketio.run(app, debug=True)
