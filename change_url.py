#!/usr/python3
from flask import Flask, render_template
app = Flask(__name__)


@app.route('/searchpage', strict_slashes=False)
def search_page():
    '''Search return'''
    return render_template('mysearchpage.html')
