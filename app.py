from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/index.html')
def home():
    return render_template('index.html')

@app.route('/signup.html')
def signup():
    return render_template('signup.html')

@app.route('/profile.html')
def profile():
    return render_template('profile.html')

@app.route('/study-plan.html')
def study_plan():
    return render_template('study-plan.html')

if __name__ == '__main__':
    app.run(debug=True, port=3000)
