from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import threading as th
import audio
import head_pose
import detection

app = Flask(__name__)
CORS(app)  # Enable CORS

head_pose_thread = None
audio_thread = None
detection_thread = None
protection_running = False

def start_protection_threads():
    global head_pose_thread, audio_thread, detection_thread, protection_running
    if not protection_running:
        protection_running = True
        head_pose_thread = th.Thread(target=head_pose.pose, daemon=True)
        audio_thread = th.Thread(target=audio.sound, daemon=True)
        detection_thread = th.Thread(target=detection.run_detection, daemon=True)
        head_pose_thread.start()
        audio_thread.start()
        detection_thread.start()

@app.route('/start_protection', methods=['POST'])
def start_protection():
    if not protection_running:
        start_protection_threads()
        return jsonify({"status": "Protection started"})
    else:
        return jsonify({"status": "Protection already running"}), 400

@app.route('/stop_protection', methods=['POST'])
def stop_protection():
    global protection_running
    if protection_running:
        protection_running = False
        return jsonify({"status": "Protection stopped"})
    else:
        return jsonify({"status": "Protection not running"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
