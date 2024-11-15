from flask import Flask,render_template,request,jsonify
import pymysql 
from flask_cors import CORS
app = Flask(__name__,template_folder="dist",static_folder="assets")
import bcrypt
import jwt
# Allow requests from http://localhost:5173
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5000"}})


# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask_auth'


 

def get_db_connection():
    connection = pymysql.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        db=app.config['MYSQL_DB']
    )
    return connection

# print(get_db_connection().db)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/api/v1/register-user", methods=['POST'])
def register_user():
    data = request.json  # Assuming JSON payload

    # Extract and validate data
    name = data.get('name', '')
    email = data.get('email', '')
    password = data.get('password', '')
    
    if not name or not email or not password:
        return jsonify({"error": "Please fill all details."}), 400  # Bad request

    # hash password
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    ## check user already exist or not
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM user WHERE email = %s', (email,))
    user = cursor.fetchone()

    if user:
        return jsonify({"error": "User already exists with this email."}), 400


    # create new user
    cursor.execute('insert into user(name,email,password) values(%s,%s,%s)', (name,email,hashed))

    last_insert_id = cursor.lastrowid
    connection.commit()
    connection.close()

    encoded_jwt = jwt.encode({"userId": last_insert_id}, "secret", algorithm="HS256")


    print(hashed)
    return jsonify({
        "succes":"User Register Successfully",
        "token":encoded_jwt
    }), 200


@app.route("/api/v1/profile",methods=["GET"])
def get_profile():

    token = request.headers.get("authorization") or ''

    if not token:
        return {"error":"please login first"},400
    
    token = token.split(" ")[1]
    if not token:
        return {"error":"please login first"},400
    
    decode_data = jwt.decode(token,"secret",algorithms=["HS256"])

    
    # print(decode_data)

    ## check user already exist or not
    connection = get_db_connection()
    cursor = connection.cursor()
    # profile get query
    cursor.execute("select * from user where id=%s",(decode_data['userId']))
    user = cursor.fetchone()
    print(cursor.description)
    connection.close()

    if user is None:
        return {"error": "User not found"}, 404

    # Convert tuple to dictionary
    columns = [desc[0] for desc in cursor.description]  # Get column names
    user_dict = dict(zip(columns, user))  # Combine column names with values into a dict
    del user_dict["password"]
    return user_dict
    # fetch user
@app.route("/api/v1/login-user",methods=['POST'])
def login_user():
    login_data = request.json
    # extract login_data
    email = login_data.get('email')
    password = login_data.get('password')

    if(not email or not password):
        return {"error":"Please fill all details"},400
    
    # check user exist in our db 
    connection = get_db_connection()
    cursor = connection.cursor()

    # execute sql query
    cursor.execute("select * from user where email=%s",(email))
    user = cursor.fetchone()
    if(not user):
        return {"error":"Invalid Credentials"},400
    columns = [desc[0]  for desc in cursor.description ]
    connection.close()
    data = dict(zip(columns,user)) 
    # check password
    is_match = bcrypt.checkpw(password.encode('utf-8'),data['password'].encode('utf-8'))
    if(not is_match):
        return {"error":"User id and Password invalid"},400
    token = jwt.encode({"userId":data['id']},"secret", algorithm="HS256")
    return{
        "msg":"Login Success",
        "token":token
    }

@app.route("/get-chats")
def home1():

    return [
        "Hello1",
        "Hello2",
        "Hello3",
        "Hello4",
        "Hello5"
    ]

@app.route("/<path:subpath>",methods=["GET"])
def catch(subpath):
    return render_template("index.html")

if '__main__' == __name__:
    app.run(debug=True)