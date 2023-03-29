from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

def get_database():
    return client.get_database("task_manager")

def get_collection(collection_name: str):
    db = get_database()
    return db.get_collection(collection_name)
