import express from 'express'
import { config } from './config.js'

import ethers from "ethers";
import { transferToken } from './transfer-token.js';

import {logger} from "./logger.js";

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({ "status": 200 });
})
app.post('/transfer', async (req, res) => {
    const { wallet_address, amount } = req.body;

    try {
        let errors = {};
        if (!ethers.utils.isAddress(wallet_address))
            errors["wallet_address"] = "Invalid Wallet Address. It should be valid ethereum wallet address.";

        if (!/^\d+$/.test(amount))
            errors["amount"] = "Invalid Amount. It should be valid integer.";

        let parsedAmount = parseInt(amount);

        if (Object.keys(errors).length > 0) return res.status(400).json({
            "message": "Invalid Inputs",
            "status": "error",
            "errors": errors
        })

        const transferResponse = await transferToken(wallet_address, parsedAmount);

        logger.info({wallet_address, amount, transactionHash: transferResponse.receipt.transactionHash});

        return res.json({
            "message": "Tokens Transfered Successfully",
            "status": "success",
            "data": {
                "transaction_hash": transferResponse.receipt.transactionHash,
                "block_hash": transferResponse.receipt.blockHash,
            }
        });
    } catch (error) {
        logger.error({wallet_address, amount, error_message: error.message, error_stack: error.stack});

        return res.status(500).json({
            "message": "Internal Server Error",
            "status": "error"
        })
    }
})

process.on('uncaughtException', error => {
    logger.error({from: "Uncaught Exception", error_message: error.message, error_stack: error.stack});
    process.exit(1);
})

process.on('unhandledRejection', error => {
    logger.error({from: "Uncaught Rejection", error_message: error.message, error_stack: error.stack});
    process.exit(1);
})

app.use((err, req, res, next) => {
    logger.error({from: "Express Error Middleware", error_message: err.message, error_stack: err.stack, req});

    return res.status(500).json({
        "message": "Internal Server Error",
        "status": "error"
    })
})

app.listen(config.app.port, () => {
    console.log(`App is live and listening on http://localhost:${config.app.port}`)
})