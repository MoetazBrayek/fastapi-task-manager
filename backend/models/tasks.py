from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Task(BaseModel):
    title: str
    description: str
    start_date: datetime
    end_date: datetime
    assigned_to: str
    status: str
    user_id: str
