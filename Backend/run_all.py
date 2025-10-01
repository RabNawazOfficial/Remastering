import subprocess

# Run app.py
app_process = subprocess.Popen(["python", "app.py"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# Run data_api.py
data_process = subprocess.Popen(["python", "data_api.py"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

print("Both servers started. Press CTRL+C to stop.")

# Keep the script alive
try:
    app_out, app_err = app_process.communicate()
    data_out, data_err = data_process.communicate()

    print("App Output:", app_out.decode())
    print("App Errors:", app_err.decode())
    print("Data API Output:", data_out.decode())
    print("Data API Errors:", data_err.decode())

except KeyboardInterrupt:
    print("Stopping servers...")
    app_process.terminate()
    data_process.terminate()