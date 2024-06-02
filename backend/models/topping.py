from pydantic import BaseModel

class Topping(BaseModel):
    price: float = 0
    toppingName: str = ""