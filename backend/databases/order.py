from models.order import Order
import motor.motor_asyncio
import os

DB_URL = os.environ.get('DB_URL')

client = motor.motor_asyncio.AsyncIOMotorClient(DB_URL)

database = client["boba_store"]

collection = database["orders"]

async def create_order(order):
    result = collection.insert_one(order)
    return result

async def delete_order(order):
    deleted_order = await collection.delete_one(order)
    return deleted_order

async def get_one_order(order):
    return collection.find_one(order)

async def get_all_orders(order):
    orders = []
    cursor = collection.find(order)
    async for order in cursor:
        orders.append(order(**order))
    return orders

async def update_order(order, new_order):
    updated_order = await collection.update_one(
        order,
        {
            "$set": new_order
        }
    )
    return updated_order