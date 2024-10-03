from flask import Flask, render_template, request, redirect, url_for
import sqlite3
import datetime

app = Flask(__name__)

# default route for index.html the homepage
@app.route('/')
def index():
    return render_template('index.html')


# new Python file for Antepenultimate
# install flask, sqlite, setup initial template, create the game logic, obtain images
# i should have a main application file .py then individual logic components for the aspects of the tournament bracket creator




#! NOTES TODO:
#? I need to setup the hamburger menu so users can access the database saves, create a new tournament, or access an older tournament
#? cool loading gif ans spinner
#? in the bracket setup break things out into additional templates


# Run the Antepenultimate application
if __name__ == '__main__':
    app.run(debug=False)