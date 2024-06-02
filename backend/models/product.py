from pydantic import BaseModel

class Product(BaseModel):
    price: float = 0
    productName: str = ""
    size: str = ""
    description: str = ""
    image: str = ""