# ZENZO Forge REST API

## The Basics
**Description:** This is a guide into the basics of how the ZENZO Forge REST API functions and how to interact with the API using [Postman](https://www.getpostman.com/downloads/).

The Forge REST API uses `POST` HTTP requests, with some endpoints being public and unauthenticated. Other endpoints are private, requiring an `auth` token that gets randomly generated everytime a Forge Node restarts.




## Setting up the environment
1. Ensure you have the latest version of the [ZENZO Forge](https://github.com/ZENZO-Ecosystem/zenzo-forge/releases) running.
2. Download [Postman](https://www.getpostman.com/downloads/).
3. Run and setup Postman. Then hit **"New"**, followed by **"Request"**, and then set **"GET"** to **"POST"** and add **"Content-Type"** as **"application/x-www-form-urlencoded"**.
4. Add the root host to the endpoint (this should be `http://localhost` for most people).




## How to use the API
First, you must decide which API **Endpoint** you want to call. For instance, calling `/forge/items` is the "Forge Items" endpoint, which returns a list of all known ZENZO Forge Items (ZFIs).

Some APIs require additional information, such as **Body** keys and properties. You can add/remove Body properties with the "**Body"** tab and checking the `x-www-form-urlencoded` option.

For example, using the `/forge/smelt` endpoint requires an **"auth"** and a **"hash"** key. The "auth" is the authkey generated by the local Forge Node (found in the debug console) and the "hash" key is the TX-ID of the item you want to smelt.




## Endpoints list

**PUBLIC APIs (No Auth Required)**

### ZENZO Forge Items 
(Returns a list of **all** known items on the network)
- Endpoint: `/forge/items`

### ZENZO Forge Inventory 
(Returns a list of items owned by the local node. e.g., the node's inventory)
- Endpoint: `/forge/inventory`

### ZENZO Forge Profiles 
(Returns a list of **all** known ZENZO Profiles on the network)
- Endpoint: `/forge/profiles`

### ZENZO Forge Profile 
(Returns a single profile by its **Username** or **Address**)
- Endpoint: `/forge/profile`
- Body key "name": (text, the name or address of the profile to search for)

**Private APIs (Auth Required)**

:warning:**WARNING:** Only use these locally! If your auth-key is found publicly, your funds are at severe risk.  

### Account 
(Returns general information of the node and its user: Address, Balance, & Wallet Version)
- Endpoint: `/forge/account`
- Body key "**auth**": (text, the authentication key generated by the node)  

### Create 
(Crafts an item, creating a custom ZENZO Forge Item)
- Endpoint: `/forge/create`
- Body key "**auth**": (text, the authentication key generated by the node)
- Body key "**name**": (text, the display name of the item) * must be between 1 to 50 characters in length
- Body key "**image**": (text, URL—the URL of the item's image) * cannot be empty, use "default" to tell DApps to use their default item cover
- Body key "**amount**": (number, the value in ZNZ of the item) * must be atleast 0.01 ZNZ
- (Optional) Body key: "**metadata**": (custom data, you may store 2 KB of custom data in an item) * must not exceed 2KB
- (Optional) Body key: "**contracts**": (JSON object, keys are the names of each contract, property is the contract instructions) * must not exceed 1KB

### Transfer 
(Transfers an item to another Address)
- Endpoint: `/forge/transfer`
- Body key "**auth**": (text, the authentication key generated by the node)
- Body key "**item**": (text, the TX-ID of the item to transfer)
- Body key "**to**": (text, the Address to transfer the item to)

### Smelt 
(Smelts an item, destroying it and returning the ZNZ-backed value to the user)
- Endpoint: `/forge/smelt`
- Body key "**auth**": (text, the authentication key generated by the node)
- Body key "**hash**": (text, the TX-ID of the item to smelt)