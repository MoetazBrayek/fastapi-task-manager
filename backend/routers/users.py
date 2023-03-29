from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.collection import Collection
from models.user import User, UserIn, UserOut
from utils.auth import get_current_user, get_user_collection
from utils.security import get_password_hash

router = APIRouter()

@router.post("/users", response_model=UserOut)
def create_user(user: UserIn, user_collection: Collection = Depends(get_user_collection)):
    user_data = user.dict()
    user_data["password"] = get_password_hash(user_data["password"])
    user_id = user_collection.insert_one(user_data).inserted_id
    user_data["_id"] = str(user_id)
    return UserOut(**user_data)

@router.get("/users/me", response_model=UserOut)
def read_user_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/users/{username}", response_model=UserOut)
def read_user(username: str, user_collection: Collection = Depends(get_user_collection)):
    user_data = user_collection.find_one({"username": username})
    if user_data:
        return UserOut(**user_data)
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
