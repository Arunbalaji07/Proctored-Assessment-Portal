import tkinter as tk
from tkinter import ttk
import head_pose
import audio
import detection
import threading as th

head_pose_thread = None
audio_thread = None
detection_thread = None
protection_running = False

def start_protection():
    global head_pose_thread, audio_thread, detection_thread, protection_running
    if not protection_running:
        label_status.config(text="AI Protection: ON", foreground="#28a745")
        protection_running = True
        detection.stop_detection = False  # Reset stop flag
        head_pose_thread = th.Thread(target=head_pose.pose, daemon=True)
        audio_thread = th.Thread(target=audio.sound, daemon=True)
        detection_thread = th.Thread(target=detection.run_detection, daemon=True)
        head_pose_thread.start()
        audio_thread.start()
        detection_thread.start()

def stop_protection():
    global protection_running
    if protection_running:
        protection_running = False
        detection.stop_detection_loop()  # Set the flag to stop the detection thread
        label_status.config(text="AI Protection: OFF", foreground="#dc3545")

# GUI setup
root = tk.Tk()
root.title("AI Protection System")
root.geometry("600x400")
root.configure(bg="#f7f7f7")

style = ttk.Style()
style.configure('TButton', font=('Arial', 12), padding=10, width=15)
style.configure('TLabel', font=('Arial', 14), background="#f7f7f7")
title_label = tk.Label(root, text="AI Protection System", font=("Helvetica", 20, "bold"), bg="#f7f7f7", fg="#333333")
title_label.pack(pady=20)
label_status = tk.Label(root, text="AI Protection: OFF", font=("Arial", 16), bg="#f7f7f7", fg="#dc3545")
label_status.pack(pady=20)
btn_frame = tk.Frame(root, bg="#f7f7f7")
btn_frame.pack(pady=20)
btn_start = ttk.Button(btn_frame, text="Start Protection", command=start_protection, style='TButton')
btn_start.grid(row=0, column=0, padx=10)
btn_stop = ttk.Button(btn_frame, text="Stop Protection", command=stop_protection, style='TButton')
btn_stop.grid(row=0, column=1, padx=10)

footer_label = tk.Label(root, text="© 2024 AI Proctored Assessment Portal by study senses", font=("Arial", 10), bg="#f7f7f7", fg="gray")
footer_label.pack(side="bottom", pady=20)

root.mainloop()
