import dotenv from 'dotenv'
dotenv.config();

export const config = {
    app: {
        port: process.env.PORT
    },
    contract: {
        privateKey: process.env.PRIVATE_KEY,
        contractAddress: process.env.CONTRACT_ADDRESS,
        chain: process.env.CHAIN,
    }
}