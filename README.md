# Bazaar
REST API for an e-commerce marketplace

1. Install node-modules
    ```
    npm i
    ```
2. Start mongodb instance locally
    ```
    mongod
    ```
    
3. Run the below command to start the server
    ```
    npm run start
    ```
    
# APIs

## Auth APIs

1. POST `/api/auth/register`
Register a user (accept email, password, type of user - buyer/seller)
Sample Payload - 
```
{
	"email":"seller@gmail.com",
	"password": "test1234",
	"type": "seller"
}
```
Sample Response -
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzA1YzJkZTA2NWE3NWFlNjRkZTc0NzMiLCJpYXQiOjE2NjEzMjE5NTAsImV4cCI6MTY2MTMyNTU1MH0.qMhm4osYzwrNiwuNwaUEBWFPKuTgmqyxUmYw5HDWWjk"
}
```

2. POST /api/auth/login
Let a previously registered user log in (e.g. retrieve authentication token)
Sample Payload - 
```
{
	"email":"seller@gmail.com",
	"password": "test1234"
}
```
Sample Response -
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzA1YmJlODQ5OGUyNTE1MGRlYWEyMWYiLCJpYXQiOjE2NjEzMjI5MTQsImV4cCI6MTY2MTMyNjUxNH0.pfDxmO7q-fI04mBhnSrkEcYtNYLwC6bob3Q7pWH4dpw",
  "message": "Login success!"
}
```

## APIs for buyers

1. GET /api/buyer/list-of-sellers
Get a list of all sellers

Sample Response -
```
{
  "sellersList": [
    {
      "name": "Daily Needs",
      "category": "Grocery",
      "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqN13_2YkaOGpxNRBXjGY7SEVUR8LiHDwLZ0bRGQaI&s",
      "sellerId": "6305c2de065a75ae64de7473"
    }
  ]
}
```

2. GET /api/buyer/seller-catalog/:seller_id
Get the catalog of a seller by seller_id

Sample Response -
```
{
  "products": [
    {
      "productId": "6305c69b0214d85d468dad9d",
      "_id": "6305c69b0214d85d468dad9d",
      "currency": "INR",
      "name": "Tea",
      "price": 43,
      "avaiableQty": 2000
    },
    {
      "productId": "6305c69b0214d85d468dad9e",
      "_id": "6305c69b0214d85d468dad9e",
      "currency": "INR",
      "name": "Rice",
      "price": 100,
      "avaiableQty": 2000
    },
    {
      "productId": "6305c69b0214d85d468dad9f",
      "_id": "6305c69b0214d85d468dad9f",
      "currency": "INR",
      "name": "Wheat Flour",
      "price": 145,
      "avaiableQty": 2000
    }
  ]
}
```

3. POST /api/buyer/create-order/:seller_id
Send a list of items to create an order for seller with id = seller_id

Sample Payload - 
```
{
	"products": [{
		"qty": "2",
		"productId": "6305baf56b55bf7c6b4927eb"
	}],
	"address": "XYZ road abc colony some city, some pincode"
}
```
Sample Response -
```
{
  "message": "order placed successfully"
}
```

## APIs for sellers

1. POST /api/seller/create-catalog
Send a list of items to create a catalog for a seller

Sample Payload - 
```
{
  "name": "Daily Needs",
  "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqN13_2YkaOGpxNRBXjGY7SEVUR8LiHDwLZ0bRGQaI&s",
  "category": "Grocery",
  "products": [
    {
      "name": "Tea",
      "price": 43,
      "currency": "INR",
      "avaiableQty": 2000
    },
    {
      "name": "Rice",
      "price": 100,
      "currency": "INR",
      "avaiableQty": 2000
    },
    {
      "name": "Wheat Flour",
      "price": 145,
      "avaiableQty": 2000
    }
  ]
}
```
Sample Response -
```
{
  "message": "Catalog created/updated successfully",
  "catalogId": "6305c55ce79848c076f0fc38"
}
```

2. GET /api/seller/orders
Retrieve the list of orders received by a seller

Sample Response -
```
{
  "orders": [
    {
      "_id": "6305e3e2e79848c076f1122b",
      "sellerId": "6305c2de065a75ae64de7473",
      "userId": "6305bbe8498e25150deaa21f",
      "address": "XYZ road abc colony some city, some pincode",
      "products": [
        {
          "productId": "6305baf56b55bf7c6b4927eb",
          "status": "orderPlaced",
          "qty": "2"
        }
      ]
    }
  ]
}
```
