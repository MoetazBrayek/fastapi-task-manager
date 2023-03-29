from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str
    is_admin: bool = False
