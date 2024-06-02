from models.topping import Topping

import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")

database = client["boba_store"]

collection = database["toppings"]

async def create_topping(topping):
    result = await collection.insert_one(topping)
    return result

async def delete_topping(topping):
    deleted_topping = await collection.delete_one(topping)
    return deleted_topping

async def get_one_topping(topping):
    return collection.find_one(topping)

async def get_all_toppings(topping):
    toppings = []
    cursor = collection.find(topping)
    async for topping in cursor:
        toppings.append(Topping(**topping))
    return toppings

async def update_topping(topping, newTopping):
    updated_topping = await collection.update_one(
        topping,
        {
            "$set": newTopping
        }
    )
    return updated_topping