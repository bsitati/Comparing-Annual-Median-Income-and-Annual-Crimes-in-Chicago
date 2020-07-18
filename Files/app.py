from flask import (
    Flask,
    g,
    redirect,
    render_template,
    request,
    url_for,
    jsonify,
)
import sqlite3
import json
import collections
import sys


app = Flask(__name__,
            template_folder="templates")


DATABASE = 'CrimeChicago.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()   

@app.route("/")
def home():
    """Serve homepage template."""
    return render_template(
        'home.html',
        title='Flask-Login Tutorial.',
        body="You are now logged in!"
    )

@app.route("/Files") 

@app.route('/api/v2/chicago_crime')
def crime_list():
    db = get_db()
    data = db.execute('SELECT * FROM criminals_mappings00').fetchall()

    # print(data)
    # return jsonify(data)
    # return json.dumps([tuple(row) for row in data])

    # Convert query to objects of key-value pairs
    objects_list = []
    for row in data:
        d = collections.OrderedDict()
        d['ID'] = row[1]
        d['Date'] = row[2]
        d['Crime'] = row[3]
        d['Latitude'] = row[4]
        d['Longitude'] = row[5]
        d['Year'] = row[6]
        # d['ST'] = row.ST
        # d['Zip'] = row.Zip
        objects_list.append(d)
    # j = json.dumps(objects_list)
    objects_file = 'Files/static/data/crime_objects_data00.js'
    f = open(objects_file,'w')
    json.dump(objects_list, f)

    # print('Filename:', objects_file, file=f)  # Python 3.x 

    # return ''
    return jsonify(objects_list)
   
    # print >> f, j
        
    #conn.close()




if __name__ == '__main__':
    app.run(debug=True)