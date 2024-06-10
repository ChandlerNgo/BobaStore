from models.product import Product
import motor.motor_asyncio
import os

DB_URL = os.environ.get('DB_URL')

client = motor.motor_asyncio.AsyncIOMotorClient(DB_URL)

database = client["boba_store"]

collection = database["products"]

async def create_product(product):
    result = await collection.insert_one(product)
    return result

async def delete_product(product):
    deleted_product = await collection.delete_one(product)
    return deleted_product

async def get_one_product(product):
    return collection.find_one(product)

async def get_all_products(product):
    products = []
    cursor = collection.find(product)
    async for product in cursor:
        products.append(Product(**product))
    return products

async def update_product(product,newProduct):
    updated_product = await collection.update_one(
        product,
        {
            "$set": newProduct
        }
    )
    return updated_product