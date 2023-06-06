import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import ethers from "ethers";
import { config } from "./config.js";

export const transferToken = async (toAddress,amount) => {
    const privateKey = config.contract.privateKey;
    const contractAddress = config.contract.contractAddress;
    const chain = config.contract.chain;

    if(!ethers.utils.isAddress(toAddress))
        throw new Error('INVALID_ADDRESS');

    if(!/^\d+$/.test(amount))
        throw new Error('INVALID_AMOUNT');
    
    let parsedAmount = parseInt(amount);

    const sdk = ThirdwebSDK.fromPrivateKey(privateKey,chain);
    const contract = await sdk.getContract(contractAddress);

    const data = await contract.erc20.transfer(toAddress, parsedAmount);

    return data;
}