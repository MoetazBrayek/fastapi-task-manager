from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List
from datetime import datetime, timedelta
import jwt
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os
from typing import Union
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

mongo_client = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client["task_manager"]
user_collection = db["users"]
task_collection = db["tasks"]
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_TIME_MINUTES = 30

class User(BaseModel):
    # make it unique
    username  : str 
    password: str
    is_admin: bool = False



class Task(BaseModel):
    title: str
    description: str
    start_date: datetime
    end_date: datetime
    assigned_to: str
    status: str
    user_id: str

class UpdateTaskStatus(BaseModel):
    status: str
    description: str = None

class Token(BaseModel):
    access_token: str
    token_type: str


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(username: str, password: str):
    user = user_collection.find_one({"username": username, "password": password})
    if user:
        return User(**user)
    else:
        return None

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm="HS256")
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return payload

def get_current_admin_user(user: User = Depends(get_current_user)):
    if user["is_admin"]:
        return user
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Insufficient privileges")



#create a register user
@app.post("/register")
def register_user(user: User):
    user_data = user.dict()
    #hash the password jwt
    user_data["password"] = get_password_hash(user_data["password"])
    
    user_id = user_collection.insert_one(user_data).inserted_id
    user_data["_id"] = str(user_id)
    return user_data


@app.post("/login", response_model=Token)
def login_for_access_token(form_data: User):
    #search for user in datbase using username only 
    user_data = form_data.dict()
    print(user_data)

    user = user_collection.find_one({"username": user_data["username"]})
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid username or password")
    #verify password
    print(user["password"] , user_data["password"])
    if not verify_password(user_data["password"], user["password"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid username or password")
    access_token_expires = timedelta(minutes=JWT_EXPIRATION_TIME_MINUTES)
    access_token = create_access_token(data={"username": user["username"], "is_admin": user["is_admin"] }, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/tasks")
def create_task(task: Task):
    task_data = task.dict()
    task_id = task_collection.insert_one(task_data).inserted_id
    return {"message": "Task created successfully", "task_id": str(task_id)}

@app.get("/tasks")
def get_tasks():
    tasks = []
    for task in task_collection.find({}).sort("start_date", -1):
        tasks.append(Task(**task))
    return tasks

@app.get("/tasks/{task_id}")
def get_task(task_id: str, user: User = Depends(get_current_user)):
    task = task_collection.find_one({"_id": ObjectId(task_id), "user_id": user.id})
    if task:
        return Task(**task)
    else:
        return {"message": "Task not found"}

@app.put("/tasks/{task_id}")
def update_task(task_id: str, task: Task, user: User = Depends(get_current_user)):
    task_data = task.dict(exclude_unset=True)
    task_data["user_id"] = user.id
    result = task_collection.update_one(
    {"_id": ObjectId(task_id), "user_id": user.id},
    {"$set": task_data},
    )
    if result.modified_count == 1:
        return {"message": "Task updated successfully"}
    else:
        return {"message": "Task not found"}

@app.put("/tasks/{task_id}/status")
def update_task_status(task_id: str, status_update: UpdateTaskStatus, user: User = Depends(get_current_user)):
    result = task_collection.update_one(
    {"_id": ObjectId(task_id), "user_id": user.id},
    {"$set": {"status": status_update.status, "description": status_update.description}},
    )
    if result.modified_count == 1:
        return {"message": "Task status updated successfully"}
    else:
        return {"message": "Task not found"}


#create user
@app.post("/users", response_model=User)
def create_user(user: User, admin_user: User = Depends(get_current_admin_user)):
    user_data = user.dict()
    user_id = user_collection.insert_one(user_data).inserted_id
    user_data["_id"] = str(user_id)
    return user_data

# make the app before run connect to the database
# list all the users
@app.get("/users", dependencies=[Depends(get_current_admin_user)])
def list_users():
    users = []
    for user in user_collection.find({}):
        #append only the username and id
        users.append({"username": user["username"], "id": str(user["_id"])})
    #remove the password from the response before returning
    #until i find a better way to do this PyMongo 3.7 and later versions
    return users


#health endpoint
@app.get("/health")
def health():
    return {"status": "ok"}