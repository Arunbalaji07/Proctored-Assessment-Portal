import time
import matplotlib.pyplot as plt
import head_pose  # Assuming head_pose.py contains the pose() function for head pose detection

PLOT_LENGTH = 200
GLOBAL_CHEAT = 0
PERCENTAGE_CHEAT = 0
CHEAT_THRESH = 0.6
XDATA = list(range(PLOT_LENGTH))
YDATA = [0] * PLOT_LENGTH
stop_detection = False  # Flag to stop the detection loop

def avg(current, previous):
    """Averaging function to smooth percentage cheat values."""
    if previous > 1:
        return 0.65
    if current == 0:
        return max(previous / 1.01, 0.01)
    if previous == 0:
        return current
    return 0.9 * previous + 0.1 * current

def process_cheating():
    """Update cheat percentage based on head pose only."""
    global GLOBAL_CHEAT, PERCENTAGE_CHEAT

    if head_pose.X_AXIS_CHEAT == 0 and head_pose.Y_AXIS_CHEAT == 0:
        PERCENTAGE_CHEAT = avg(0, PERCENTAGE_CHEAT)
    else:
        PERCENTAGE_CHEAT = avg(0.9, PERCENTAGE_CHEAT)

    GLOBAL_CHEAT = int(PERCENTAGE_CHEAT > CHEAT_THRESH)

def run_detection():
    """Main function to detect suspicious behavior."""
    global XDATA, YDATA, stop_detection

    # Set up the plot for visualizing cheating probability
    fig, ax = plt.subplots()
    ax.set_xlim(0, PLOT_LENGTH)
    ax.set_ylim(0, 1)
    line, = ax.plot(XDATA, YDATA, 'r-', label="Cheat Probability")

    plt.title("Suspicious Behavior Detection")
    plt.xlabel("Time")
    plt.ylabel("Cheat Probability")
    plt.legend()

    # Main detection loop
    start_time = time.time()
    while not stop_detection and time.time() - start_time < 60:  # Run detection for 60 seconds
        process_cheating()

        # Shift data for the plot
        YDATA = YDATA[1:] + [PERCENTAGE_CHEAT]
        line.set_ydata(YDATA)
        plt.pause(0.01)

    # Final response after detection ends
    print(f"Final Cheat Percentage: {PERCENTAGE_CHEAT}")
    print(f"Global Cheat Status: {'CHEATING' if GLOBAL_CHEAT else 'NO CHEATING'}")
    plt.close(fig)

def stop_detection_loop():
    """Stop the detection loop."""
    global stop_detection
    stop_detection = True

if __name__ == "__main__":
    try:
        run_detection()
    except KeyboardInterrupt:
        stop_detection_loop()
        print("Detection stopped by user.")
