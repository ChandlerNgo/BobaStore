from models.customer import Customer
import motor.motor_asyncio
import os

DB_URL = os.environ.get('DB_URL')

client = motor.motor_asyncio.AsyncIOMotorClient(DB_URL)

database = client["boba_store"]

collection = database["customers"]

async def create_customer(customer):
    result = collection.insert_one(customer)
    return result

async def delete_customer(customer):
    deleted_customer = await collection.delete_one(customer)
    return deleted_customer

async def get_one_customer(customer):
    return collection.find_one(customer)

async def get_all_customers(customer):
    customers = []
    cursor = collection.find(customer)
    async for customer in cursor:
        customers.append(Customer(**customer))
    return customers

async def update_customer(customer, new_customer):
    updated_customer = await collection.update_one(
        customer,
        {
            "$set": new_customer
        }
    )
    return updated_customer