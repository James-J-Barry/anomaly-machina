# backend/app.py
from flask import Flask, jsonify
import random
import os
from dotenv import load_dotenv
from openai import OpenAI
from flask import request # Make sure to import request
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}}, supports_credentials=True)

@app.route('/api/test')
def test_api():
    return jsonify({"message": "Backend is running!"})

@app.route('/api/roll/<string:dice_type>')
def roll_dice(dice_type):
    # e.g., dice_type could be "d20"
    try:
        sides = int(dice_type[1:]) # Extract number of sides from string
        roll = random.randint(1, sides)
        return jsonify({"dice": dice_type, "result": roll})
    except:
        return jsonify({"error": "Invalid dice format"}), 400
    
load_dotenv() # Loads the .env file

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/api/prompt', methods=['POST'])
def handle_prompt():
    user_input = request.json.get('prompt')
    if not user_input:
        return jsonify({"error": "No prompt provided"}), 400

    # This is a very basic prompt. You'll make this much more detailed later!
    system_prompt = "You are a Dungeons and Dragons Dungeon Master. Be descriptive and engaging."

    completion = client.chat.completions.create(
        model="gpt-5-nano",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input}
        ]
    )

    ai_response = completion.choices[0].message.content
    return jsonify({"response": ai_response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)