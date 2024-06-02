from pydantic import BaseModel, AwareDatetime, Json
from typing import List

class Order(BaseModel):
    products: dict = {}
    price: float = 0
    orderTime: AwareDatetime
    customer: dict = {}