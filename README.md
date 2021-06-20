# Use My Tech App

### POST - Create Account
create a user with role type of renter or owner
<details>
<summary>IN PROCESS</summary>

```JSON
what you need:
{
    "username": "marco",  
    "password": "foobar", 
    "role": "owner"
}

what you get back:
{
    "user_id": 12,
    "username": "mary",
    "password": "$2a$08$cHlS2uqmuiHGvZcqcnFKNOnWcHJD49nDpINZslFqKaQi8dWMIoclC",
    "role": "owner"
}
```
</details>

-----------------------------------------------------------------------------------------

### POST - Login
<details>
<summary>IN PROCESS</summary>

```JSON
what you need:
role can be owner or renter
{
    "username": "marco",  
    "password": "foobar",
}

what you get back:
{
    "message": "marco is back!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMCwidXNlcm5hbWUiOiJtYXJjbyIsInJvbGUiOiJvd25lciIsImlhdCI6MTYxOTM2ODY1OCwiZXhwIjoxNjE5NDU1MDU4fQ.Hl9vOkOOhNPTcuckYaoj1b8KCMUvCHXGgMPFK4Vd2XA",
    "role": "owner"
}
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get All Equipment
<details>
<summary>IN PROCESS</summary>
    
```JSON
Returns ALL equipment. Anyone can make this call.

what you get back:
[
    {
        "owner": {
            "id": 2,
            "username": "Mario"
        },
        "id": 1,
        "name": "camera",
        "imgUrl": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "description": "like new",
        "isAvailable": true
    },
    {
        "owner": {
            "id": 2,
            "username": "Mario"
        },
        "id": 2,
        "name": "video camera",
        "imgUrl": "https://images.unsplash.com/photo-1589872307379-0ffdf9829123?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80",
        "description": "excellent audio and image",
        "isAvailable": true
    },
    {
        "owner": {
            "id": 2,
            "username": "Mario"
        },
        "id": 3,
        "name": "podcast microphone",
        "imgUrl": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "description": "best audio out there",
        "isAvailable": true
    }
]
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get Equipment By Id
<details>
<summary>IN PROCESS</summary>
    
```JSON
Returns equipment with specific id. Anyone can make this call.

what you get back:
{
    "owner": {
        "id": 2
    },
    "id": 1,
    "name": "camera",
    "imgUrl": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "description": "like new",
    "isAvailable": true
}
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get Owned Equipment
<details>
<summary>IN PROCESS</summary>

```JSON
Returns owned equipment. Only owners can make this call.

what you get back:
[
    {
        "equipment_id": 1,
        "equipment_name": "camera",
        "equipment_description": "like new",
        "equipment_img": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "equipment_available": true
    },
    {
        "equipment_id": 2,
        "equipment_name": "video camera",
        "equipment_description": "excellent audio and image",
        "equipment_img": "https://images.unsplash.com/photo-1589872307379-0ffdf9829123?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80",
        "equipment_available": false
    },
    {
        "equipment_id": 3,
        "equipment_name": "podcast microphone",
        "equipment_description": "best audio out there",
        "equipment_img": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "equipment_available": false
    }
]
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get Rented Equipment
<details>
<summary>IN PROCESS</summary>

```JSON
Returns rented equipment. Only renters can make this call.

what you get back:
[
    {
        "owner": {
            "id": 2,
            "username": "Mario"
        },
        "id": 3,
        "name": "podcast microphone",
        "imgUrl": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "description": "best audio out there",
        "isAvailable": false
    },
    {
        "owner": {
            "id": 2,
            "username": "Mario"
        },
        "id": 2,
        "name": "video camera",
        "imgUrl": "https://images.unsplash.com/photo-1589872307379-0ffdf9829123?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80",
        "description": "excellent audio and image",
        "isAvailable": false
    }
]
```
</details>

-----------------------------------------------------------------------------------------

### POST - Add Equipment
<details>
<summary>IN PROCESS</summary>
    
```JSON
Adds equipment to database. Only owners can make this call.

what you need:
{
    "name": "mining rig",
    "description": "generates money",
    "imgUrl": "https://cdn.mos.cms.futurecdn.net/pLmxqBBToop8EyqSyTzExn-970-80.jpg.webp"
}

what you get back:
{
    "owner": {
        "id": 2,
        "username": "Mario"
    },
    "id": 4,
    "name": "mining rig",
    "imgUrl": "insert-image-url-here",
    "description": "generates money",
    "isAvailable": true
}
```
</details>

-----------------------------------------------------------------------------------------

### PUT - Update Equipment By ID
<details>
<summary>IN PROCESS</summary>
    
```JSON
Updates existing owned equipment. Only owner of equipment can make this call.

what you need (optional):
{
    "name": "mining rig",
    "description": "generates money",
    "imgUrl": "https://cdn.mos.cms.futurecdn.net/pLmxqBBToop8EyqSyTzExn-970-80.jpg.webp"
}

what you get back:
{
    "owner": {
        "id": 2,
        "username": "Mario"
    },
    "id": 4,
    "name": "mining rig",
    "imgUrl": "insert-image-url-here",
    "description": "generates money",
    "isAvailable": true
}
```
</details>

-----------------------------------------------------------------------------------------

### DELETE - Remove Equipment By ID
<details>
<summary>IN PROCESS</summary>
    
```JSON
Deletes equipment with specific id. Only owner of equipment can make this call.

what you get back:
{
    "owner": {
        "id": 2,
        "username": "Mario"
    },
    "id": 4,
    "name": "mining rig",
    "imgUrl": "insert-image-url-here",
    "description": "generates money",
    "isAvailable": true
}
```
</details>

-----------------------------------------------------------------------------------------

### POST - Create A Rental Request
<details>
<summary>IN PROCESS</summary>
    
```JSON
Creates a request to rent equipment. Only renters can make this call.

what you need:
{
    "equipment_id": 2
}

what you get back:
{
    "request_id": 4,
    "user_id": 1,
    "equipment_id": 2,
    "accepted": false
}
```
</details>

-----------------------------------------------------------------------------------------

### PUT - Accept Rental Request By ID
<details>
<summary>IN PROCESS</summary>
    
```JSON
Accepts request to rent equipment. Makes equipment unavailable until
rental is terminated. Only owner of equipment can make this call.

what you get back:
{
    "request_id": 4,
    "user_id": 1,
    "equipment_id": 2,
    "accepted": false
}
```
</details>

-----------------------------------------------------------------------------------------

### DELETE - Terminate Rental Request By ID
<details>
<summary>IN PROCESS</summary>

```JSON
Accepts request to rent equipment. Makes equipment unavailable until
rental is terminated. Only owner of equipment can make this call.

what you get back:
{
    "request_id": 4,
    "user_id": 1,
    "equipment_id": 2,
    "accepted": false
}
```
</details>

-----------------------------------------------------------------------------------------
