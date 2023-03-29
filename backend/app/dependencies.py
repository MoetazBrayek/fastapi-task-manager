from fastapi import Header, HTTPException
from fastapi import Depends
from bson.objectid import ObjectId
from pymongo.collection import Collection
from models.user import User
from utils.security import get_user_collection, verify_password, JWT_ALGORITHM, JWT_SECRET_KEY
import jwt


async def get_user_by_id(user_id: str, user_collection: Collection = Depends(get_user_collection)):
    user_data = user_collection.find_one({"_id": ObjectId(user_id)})
    if user_data is None:
        raise HTTPException(status_code=404, detail="User not found")
    user = User(**user_data)
    return user

async def get_current_user(token: str = Header(...), user_collection: Collection = Depends(get_user_collection)):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_data = user_collection.find_one({"username": username})
    if user_data is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    user = User(**user_data)
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def get_current_active_admin(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=400, detail="The user doesn't have enough privileges")
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def get_password_hash(password: str):
    return verify_password(password)


