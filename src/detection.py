import time
import audio
import head_pose
import matplotlib.pyplot as plt
import numpy as np

PLOT_LENGTH = 200

# Global variables for cheat detection
GLOBAL_CHEAT = 0
PERCENTAGE_CHEAT = 0
CHEAT_THRESH = 0.6
XDATA = list(range(200))
YDATA = [0] * 200

def avg(current, previous):
    """Averaging function to smooth percentage cheat values."""
    if previous > 1:
        return 0.65
    if current == 0:
        return max(previous / 1.01, 0.01)
    if previous == 0:
        return current
    return 1 * previous + 0.1 * current

def process_cheating():
    """Update cheat percentage based on head pose and audio data."""
    global GLOBAL_CHEAT, PERCENTAGE_CHEAT
    
    # Simplified for better readability
    if head_pose.X_AXIS_CHEAT == 0 and head_pose.Y_AXIS_CHEAT == 0:
        if audio.AUDIO_CHEAT == 0:
            PERCENTAGE_CHEAT = avg(0, PERCENTAGE_CHEAT)
        else:
            PERCENTAGE_CHEAT = avg(0.2, PERCENTAGE_CHEAT)
    else:
        if audio.AUDIO_CHEAT == 0:
            PERCENTAGE_CHEAT = avg(0.1, PERCENTAGE_CHEAT)
        else:
            PERCENTAGE_CHEAT = avg(0.4, PERCENTAGE_CHEAT)

    # Check if cheating threshold is crossed
    GLOBAL_CHEAT = int(PERCENTAGE_CHEAT > CHEAT_THRESH)
    if GLOBAL_CHEAT:
        print("CHEATING")
    print("Cheat percent:", PERCENTAGE_CHEAT, "Global Cheat:", GLOBAL_CHEAT)

def run_detection():
    """Main function to detect suspicious behavior and plot the cheat probability."""
    global XDATA, YDATA
    
    # Set up the plot
    plt.ion()  # Enable interactive mode
    fig, ax = plt.subplots()
    ax.set_xlim(0, 200)
    ax.set_ylim(0, 1)
    line, = ax.plot(XDATA, YDATA, 'r-', label="Cheat Probability")
    
    plt.title("Suspicious Behavior Detection")
    plt.xlabel("Time")
    plt.ylabel("Cheat Probability")
    plt.legend()

    # Main detection loop
    while True:
        # Update cheat data
        process_cheating()

        # Shift data for real-time plotting
        YDATA.pop(0)
        YDATA.append(PERCENTAGE_CHEAT)

        # Update plot
        line.set_ydata(YDATA)
        ax.draw_artist(line)  # Redraw just the line for efficiency
        fig.canvas.flush_events()  # Update the plot without full redraw
        time.sleep(0.2)  # Adjust frequency as needed

# Start the detection process
if __name__ == "__main__":
    run_detection()
