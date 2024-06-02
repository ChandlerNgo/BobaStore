from pydantic import BaseModel

class Customer(BaseModel):
    email: str = ""
    password: str = ""
    firstName: str = ""
    lastName: str = ""
    pastOrders: dict = {}
    # currentCart: dict = {}