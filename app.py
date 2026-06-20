from flask import Flask, send_from_directory
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route("/")
def home():
    files = []

    for file in os.listdir(BASE_DIR):
        if file.endswith(".html") and file != "index.html":
            files.append(file)

    links = ""

    for file in files:
        links += f'''
        <div style="padding:15px;margin:10px;background:#fff;border-radius:10px;">
            <a href="/template/{file}"
            style="text-decoration:none;font-size:18px;color:black;">
                {file}
            </a>
        </div>
        '''

    return f"""
    <html>
    <head>
        <title>Email Templates</title>
    </head>

    <body style="font-family:Arial;background:#f4f4f4;padding:40px;">
        <h1>Email Templates</h1>

        {links}
    </body>
    </html>
    """

@app.route("/template/<path:name>")
def template(name):
    return send_from_directory(BASE_DIR, name)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)