from databases.customer import create_customer,delete_customer,get_all_customers,update_customer,get_one_customer
from databases.order import create_order,delete_order,get_all_orders,update_order,get_one_order
from databases.product import create_product,delete_product,get_all_products,update_product,get_one_product
from databases.topping import create_topping,delete_topping,get_all_toppings,update_topping,get_one_topping
from models.product import Product
from models.topping import Topping
from models.order import Order
from models.customer import Customer
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List,Optional
import datetime

app = FastAPI()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
def read_root():
    return {"Hello":"World"}

@app.get("/menu-items")
async def get_menu_items():
    # eventually give a filter
    response = await get_all_products({})
    items = {}
    print(response)
    if response:
        for item in response:
            if item.productName not in items:
                items[item.productName] = {"sizes":{item.size:item.price},"image":item.image,"description":item.description}
            else:
                items[item.productName]["sizes"][item.size] = item.price
    return items

@app.delete("/product", response_model=Product)
async def delete_given_product(productName, size):
    product = {
        "productName": productName,
        "size": size
    }
    response = await delete_product(product)
    if response:
        return response
    raise HTTPException(404, f"No product found")

@app.delete("/order", response_model=Order)
async def delete_given_order(products,customer):
    order = {
        "products": products,
        "customer": customer,
    }
    response = await delete_order(order)
    if response:
        return response
    raise HTTPException(404, f"No order found")

@app.delete("/customer", response_model=Customer)
async def delete_given_customer(email,password,firstName,lastName):
    customer = {
        "email": email,
        "password": password,
        "firstName": firstName,
        "lastName": lastName
    }
    response = await delete_customer(customer)
    if response:
        return response
    raise HTTPException(404, f"No customer found")

@app.delete("/topping", response_model=Topping)
async def delete_given_topping(toppingName):
    topping = {
        "toppingName": toppingName
    }
    response = await delete_topping(topping)
    if response:
        return response
    raise HTTPException(404, f"No topping found")

@app.get("/products")
async def get_products(productName:Optional[str] = "",productPrice:Optional[float] = 0,size:Optional[str] = "",description:Optional[str] = "",image:Optional[str] = ""):
    product = {}
    if(productName != ""):
        product["productName"] = productName
    if(productPrice != 0):
        product["price"] = productPrice
    if(size != ""):
        product["size"] = size
    if(description != ""):
        product["description"] = description
    if(image != ""):
        product["image"] = image
    response = await get_all_products(product)
    if response:
        return response
    raise HTTPException(404, f"No products found")

@app.get("/product")
async def get_product(productName:Optional[str] = "",productPrice:Optional[float] = 0,size:Optional[str] = "",description:Optional[str] = "",image:Optional[str] = ""):
    product = {}
    if(productName != ""):
        product["productName"] = productName
    if(productPrice != 0):
        product["price"] = productPrice
    if(size != ""):
        product["size"] = size
    if(description != ""):
        product["description"] = description
    if(image != ""):
        product["image"] = image
    response = await get_one_product(product)
    if response:
        return response
    raise HTTPException(404, f"Product not found")

@app.get("/topping")
async def get_topping(toppingName:Optional[str] = "",toppingPrice:Optional[float] = 0):
    topping = {}
    if(toppingName != ""):
        topping["toppingName"] = toppingName
    if(toppingPrice != 0):
        topping["price"] = toppingPrice
    response = await get_one_topping(topping)
    if response:
        return response
    raise HTTPException(404, f"Topping not found")

@app.get("/toppings")
async def get_toppings(toppingName:Optional[str] = "",toppingPrice:Optional[float] = 0):
    topping = {}
    if(toppingName != ""):
        topping["toppingName"] = toppingName
    if(toppingPrice != 0):
        topping["price"] = toppingPrice
    response = await get_all_toppings(topping)
    if response:
        return response
    raise HTTPException(404, f"No toppings found")

@app.get("/order")
async def get_order(products:Optional[dict] = {}, orderTime:Optional[datetime.datetime] = None,orderPrice:Optional[float] = 0,customer:Optional[dict] = 0):
    order = {}
    if(products != {}):
        order["products"] = products
    if(orderTime != None):
        order["orderTime"] = orderTime
    if(orderPrice != 0):
        order["price"] = orderPrice
    if(customer != {}):
        order["customer"] = customer
    response = await get_one_order(order)
    if response:
        return response
    raise HTTPException(404, f"Order not found")

@app.get("/orders")
async def get_orders(products:Optional[dict] = {}, orderTime:Optional[datetime.datetime] = None,orderPrice:Optional[float] = 0,customer:Optional[dict] = 0):
    order = {}
    if(products != {}):
        order["products"] = products
    if(orderTime != None):
        order["orderTime"] = orderTime
    if(orderPrice != 0):
        order["price"] = orderPrice
    if(customer != {}):
        order["customer"] = customer
    response = await get_all_orders(order)
    if response:
        return response
    raise HTTPException(404, f"No orders found")

@app.get("/customer")
async def get_customer(email:Optional[str] = "",password:Optional[str] = "",firstName:Optional[str] = "",lastName:Optional[str] = "",pastOrders:Optional[dict] = {}):
    customer = {}
    if(email != ""):
        customer["email"] = email
    if(password != ""):
        customer["password"] = password
    if(firstName != ""):
        customer["firstName"] = firstName
    if(lastName != ""):
        customer["lastName"] = lastName
    if(pastOrders != {}):
        customer["pastOrders"] = pastOrders
    response = await get_one_customer(customer)
    if response:
        return response
    raise HTTPException(404, f"Customer not found")

@app.get("/customers")
async def get_customers(email:Optional[str] = "",password:Optional[str] = "",firstName:Optional[str] = "",lastName:Optional[str] = "",pastOrders:Optional[dict] = {}):
    customer = {}
    if(email != ""):
        customer["email"] = email
    if(password != ""):
        customer["password"] = password
    if(firstName != ""):
        customer["firstName"] = firstName
    if(lastName != ""):
        customer["lastName"] = lastName
    if(pastOrders != {}):
        customer["pastOrders"] = pastOrders
    response = await get_all_customers(customer)
    if response:
        return response
    raise HTTPException(404, f"No customers found")

@app.post("/products")
async def insert_products(products:List[dict]):
    for product in products:
        if "price" not in product:
            break
        if "productName" not in product:
            break
        if "size" not in product:
            break
        if "description" not in product:
            break
        if "image" not in product:
            break
        if len(product) == 5:
            break
        response = await create_product(product)
        if not response:
            raise HTTPException(404, f"Product not inserted")

@app.post("/product", response_model=Product)
async def insert_product(productName,productPrice,size,description,image):
    product = {
        "price": float(productPrice),
        "productName": productName,
        "size": size,
        "description": description,
        "image": image,
    }
    response = await create_product(product)
    if response:
        return response
    raise HTTPException(404, f"Product named '{productName}' at ${productPrice} not found")

@app.put("/product", response_model=Product)
async def update_given_product(productName,price,size,description,image,newProductName,newProductPrice,newSize,newDescription,newImage):
    product = { 
        "price": price,
        "productName": productName,
        "size": size,
        "description": description,
        "image": image,
    }
    newProduct = {
        "price": float(newProductPrice),
        "productName": newProductName,
        "size": newSize,
        "description": newDescription,
        "image": newImage,
    }
    response = await update_product(product,newProduct)
    if response:
        return response
    raise HTTPException(404, f"Product named '{productName}' at size {size} not found")

@app.put("/customer", response_model=Customer)
async def update_given_customer(email,password,firstName,lastName,newEmail,newPassword,newFirstName,newLastName):
    customer = { 
        "email": email,
        "password": password,
        "firstName": firstName,
        "lastName": lastName
    }
    newCustomer = {
        "email": newEmail,
        "password": newPassword,
        "firstName": newFirstName,
        "lastName": newLastName
    }
    response = await update_customer(customer,newCustomer)
    if response:
        return response
    raise HTTPException(404, f"{firstName} {lastName} not found")

@app.put("/order", response_model=Order)
async def update_given_order(products,price,customer,newProducts,newPrice,newCustomer):
    order = { 
        "products": products,
        "price": price,
        "customer": customer
    }
    newOrder = {
        "products": newProducts,
        "price": newPrice,
        "customer": newCustomer
    }
    response = await update_customer(order,newOrder)
    if response:
        return response
    raise HTTPException(404, f"{order} not found")

@app.put("/topping", response_model=Topping)
async def update_given_topping(price,toppingName,newPrice,newToppingName):
    topping = { 
        "price": price,
        "toppingName": toppingName
    }
    newTopping = {
        "price": newPrice,
        "toppingName": newToppingName
    }
    response = await update_customer(topping,newTopping)
    if response:
        return response
    raise HTTPException(404, f"{topping} not found")

@app.post("/toppings")
async def insert_toppings(toppings:List[dict]):
    for topping in toppings:
        if "price" not in topping:
            break
        if "toppingName" not in topping:
            break
        if len(topping) == 2:
            break
        response = await create_topping(topping)
        if not response:
            raise HTTPException(404, f"Topping not inserted")

@app.post("/topping", response_model=Topping)
async def insert_topping(toppingName,toppingPrice):
    product = {
        "price": float(toppingPrice),
        "toppingName": toppingName
    }
    response = await create_topping(product)
    if response:
        return response
    raise HTTPException(404, f"Topping named '{toppingName}' at ${toppingPrice} not found")

# add ordertime,customerInfo
@app.post("/order", response_model=Order)
async def insert_order(orderName,orderPrice,firstName,lastName,email):
    customer = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
    }
    order = {
        "price": float(orderPrice),
        "orderName": orderName,
        "orderTime": datetime.datetime.now(),
        "customer": get_one_customer(customer)
    }
    response = await create_order(order)
    if response:
        return response
    raise HTTPException(404, f"Order named '{orderName}' at ${orderPrice} not found")

# add customer info
@app.post("/customer", response_model=Customer)
async def insert_customer(email,password,firstName,lastName,pastOrders:Optional[dict]={}):
    customer = {
        "email": email,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "pastOrders": pastOrders,
    }
    response = await create_customer(customer)
    if response:
        return response
    raise HTTPException(404, f"{firstName} {lastName} not found")

