from flask import Flask
from flask_cors import CORS
from flask import request, make_response, jsonify
from flask_mysqldb import MySQL

import os
import jwt
import base64
import hashlib
import datetime

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '12345678'
app.config['MYSQL_DB'] = 'masai3'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

# base route
@app.route("/")
def home():
    try:
        conn = mysql.connection.cursor()
        conn.execute("""SELECT * FROM users""")
        rows = conn.fetchall()
        return jsonify({"data": rows}), 200
    except Exception as e:
        print(e)
    finally:
        conn.close()

# function to hash user password


def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()

# function to generate salt


def generate_salt():
    salt = os.urandom(16)
    return str(base64.b64encode(salt), "utf-8")

# function to check existed email


def check_email(email_id):
    try:
        conn = mysql.connection.cursor()
        conn.execute(
            """SELECT * FROM `users` WHERE `email` = %s""", (email_id,))
        row = conn.fetchone()
        return True if row != None else False
    except Exception as e:
        print(str(e))
        return False
    finally:
        conn.close()

# function to get salt


def get_salt(email_id):
    try:
        conn = mysql.connection.cursor()
        conn.execute(
            """SELECT `username`, `salt` FROM `users` WHERE `email` = %s""", (email_id,))
        row = conn.fetchone()
        return row['salt'] if row['username'] == email_id else False
    except Exception as e:
        print(str(e))
        return False
    finally:
        conn.close()

# function to verify user login


def verify_user(email_id, enc_password):
    try:
        conn = mysql.connection.cursor()
        conn.execute(
            """SELECT * FROM `users` WHERE `email` = %s AND `password` = %s""", (email_id, enc_password,))
        row = conn.fetchone()
        return False if row == None else row
    except Exception as e:
        print(str(e))
        return False
    finally:
        conn.close()

# upload image


def upload_file(path, f):
    location = path + f.filename
    print(location)
    f.save(location)
    print(f.filename)
    return f.filename

# routes
# signup route
@app.route("/auth/signup", methods=["POST"])
def user_signup():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]
    gender = request.json["gender"]
    dob = request.json["dob"]

    if check_email(email):
        salt = generate_salt()
        enc_password = md5_hash(password + salt)
        try:
            conn = mysql.connection.cursor()
            conn.execute("""INSERT  INTO `users`(`username`, `password`, `salt`, `fullname`, `email`, `gender`, `dob`) VALUES (%s, %s, %s, %s, %s, %s, %s)""",
                         (email, enc_password, salt, name, email, gender, dob))
            mysql.connection.commit()
            return jsonify({"error": False, "message": "User added successfully ..."}), 200
        except Exception as e:
            print(e)
            return jsonify({"error": True, "message": str(e)}), 400
        finally:
            conn.close()
    else:
        return jsonify({"error": True, "message": email + " already exist..."}), 200

# login route
@app.route("/auth/login", methods=["POST"])
def user_login():
    email = request.json["email"]
    password = request.json["password"]
    salt = get_salt(email)
    if salt:
        enc_password = md5_hash(password + salt)
        user = verify_user(email, enc_password)
        if user:
            encode_data = jwt.encode(
                {"uid": user['_id'], "email": user['email']}, "nS/Z9k", algorithm="HS256")
            return jsonify({"error": False, "message": "Login successful!", "token": str(encode_data, "utf-8")}), 200
        else:
            return jsonify({"error": True, "message": "Login failed! Username/Password Wrong"}), 200
    else:
        return jsonify({"error": True, "message": email + " not found ..."}), 200

# authenticate user
@app.route("/auth/user", methods=["GET"])
def get_user():
    token = request.headers.get('Authorization')
    print(token)
    try:
        token = token.split(' ')[1]
        decode_data = jwt.decode(token, 'nS/Z9k', algorithm=['HS256'])
        email = decode_data['email']
        uid = decode_data['uid']
        if check_email(email):
            return jsonify({"error": False, "message": "SUCCESS", "email": email, "uid": uid}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": True, "message": str(e)}), 400

# blog route
# list blog
@app.route("/blog", methods=["GET"])
def list_blogs():
    try:
        conn = mysql.connection.cursor()
        conn.execute("""SELECT `blogs`.*, `users`.`username`, `categories`.`category_name`, (SELECT COUNT(`comments`.`_id`) FROM `comments` WHERE `comments`.`blog_id` = `blogs`.`_id`) AS `comment_count` FROM `blogs` LEFT JOIN `users` ON `users`.`_id` = `blogs`.`user_id` LEFT JOIN `categories` ON `categories`.`_id` = `blogs`.`category_id`""")
        rows = conn.fetchall()
        return jsonify({"error": False, "message": "Successfully fetched all blogs!", "result": rows}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": True, "message": str(e)}), 400
    finally:
        conn.close()

# get blog by id
@app.route("/blog/<int:id>", methods=["GET"])
def get_blog_by_id(id):
    try:
        conn = mysql.connection.cursor()
        conn.execute(
            """SELECT `blogs`.*, `users`.`username` FROM `blogs` LEFT JOIN `users` ON `users`.`_id` = `blogs`.`user_id` WHERE `blogs`.`_id` =  %s""", (id,))
        row = conn.fetchone()
        return jsonify({"error": False, "message": "SUCCESS", "result": row}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": True, "message": str(e)}), 400
    finally:
        conn.close()

# get comment by blog
@app.route("/blog/comment/<int:id>", methods=["GET"])
def get_comment_by_blog(id):
    try:
        conn = mysql.connection.cursor()
        conn.execute(
            """SELECT `comments`.*, `users`.`username` FROM `comments` LEFT JOIN `users` ON `users`.`_id` = `comments`.`user_id` WHERE `comments`.`blog_id` =  %s""", (id,))
        rows = conn.fetchall()
        return jsonify({"error": False, "message": "SUCCESS", "result": rows}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": True, "message": str(e)}), 400
    finally:
        conn.close()

# create blog
@app.route("/blog/create", methods=["POST"])
def create_blog():

    title = request.json["title"]
    blog = request.json["blog"]
    category_id = request.json["category_id"]
    user_id = request.json["user_id"]
    date = datetime.datetime.now().strftime("%Y-%m-%d")
    try:
        conn = mysql.connection.cursor()
        conn.execute("""INSERT INTO `blogs`(`blog_title`, `blog`, `category_id`, `user_id`, `published_on`) VALUES (%s, %s, %s, %s, %s)""",
                     (title, blog, int(category_id), int(user_id), date))
        mysql.connection.commit()
        return jsonify({"error": False, "message": "Blog added successfully ..."}), 201
    except Exception as e:
        print(str(e))
        return jsonify({"error": True, "message": str(e)}), 400
    finally:
        conn.close()

# comments
# add comment
@app.route("/blog/comment/add", methods=["POST"])
def add_comment():
    comment = request.json["comment"]
    # print(comment)
    blog_id = request.json["blog_id"]
    user_id = request.json["user_id"]
    try:
        conn = mysql.connection.cursor()
        conn.execute("""INSERT INTO `comments` (`comment`, `blog_id`, `user_id`) VALUES (%s, %s, %s)""",
                     (comment, blog_id, user_id))
        mysql.connection.commit()
        return jsonify({"error": False, "message": "Comment added successfully ..."}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": True, "message": str(e)}), 400
    finally:
        conn.close()

# category
# fetch all category
@app.route("/category/list", methods=["GET"])
def category_list():
    try:
        conn = mysql.connection.cursor()
        conn.execute(
            """SELECT _id, category_name FROM `categories` WHERE `is_active` = '1' AND `is_deleted` = '0'""")
        rows = conn.fetchall()
        return jsonify({"error": False, "message": "Successfully fetched all categories!", "result": rows}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": True, "message": str(e)}), 400
    finally:
        conn.close()


# run server
if __name__ == "__main__":
    app.run(debug=1)
