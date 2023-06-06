# Intro
Api to transfer token to the given wallet address for specific contract.

# Installation Requirement
1. Node js v18+ lts
2. pm2 installed globally

# Development
1. Clone the repo
2. run `npm install`
3. run `cp .env.example .env`
4. update .env file with contract address, chain and wallet private key
5. run `npm run dev` to start the server

# Deploy to production
1. Clone the repo
2. run `npm install`
3. run `cp .env.example .env`
4. update .env file with contract address, chain and wallet private key
5. install pm2 globally on server `npm i -g pm2`
6. please note that you should have node js version 18 lts
7. once pm2 is installed globally, run `pm2 start ecosystem.config.cjs` in the project directory

# Usage
- Call api via curl
```bash
curl --request POST \
  --url http://localhost:3333/transfer \
  --header 'Content-Type: application/json' \
  --data '{ "wallet_address": "<wallet_address>", "amount": <amount>}'
```

- call api via node js
```javascript
const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: '{"wallet_address":"<wallet_address>","amount":<amount>}'
};

fetch('http://localhost:3333/transfer', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

- success response
```json
{
	"message": "Tokens Transfered Successfully",
	"status": "success",
	"data": {
		"transaction_hash": "<transaction_hash>",
		"block_hash": "<block_hash>"
	}
}
```

- error response
```json
{
	"message": "Invalid Inputs",
	"status": "error",
	"errors": {
		"wallet_address": "Invalid Wallet Address. It should be valid ethereum wallet address.",
		"amount": "Invalid Amount. It should be valid integer."
	}
}
```

- The logs are available in the `app.log` and `error.log` files in the project root

# NOTE:
> We have to call the api from the backend server, not from the frontend. Thats why I suggest to not host it on url but call via ip:port url on the backend.