const fs = require('fs'); // Built-in dependency for file streaming.
const solc = require('solc'); // Our Solidity compiler
const Web3 = require('web3');

const content = fs.readFileSync('/root/Documents/Projects/evmos/dev-net/contracts/uniswap/v2/core/UniswapV2Factory.sol', 'utf-8'); // Read the file...

const input = {
    language: 'Solidity',
    sources: {
        'UniswapV2Factory.sol' : {
            content,
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};


const output = JSON.parse(solc.compile(JSON.stringify(input)));

const provider = new Web3.providers.HttpProvider("http://localhost:8545");

const web3 = new Web3(provider);


let {UniswapV2Factory} = output.contracts["UniswapV2Factory.sol"]
const { abi, evm } = UniswapV2Factory
const contract = new web3.eth.Contract(abi);

// (async () => {
//     const addresses = await web3.eth.getAccounts();
//     const gasPrice = await web3.eth.getGasPrice();
//     contract.deploy({
//         data: evm.bytecode.object,
//         arguments: ["0x3CEC2860152b218fDff2a424b87Ca794bFd7864E"]
//     })
//     .send({
//         from: addresses[0],
//         gas: 4712388,
//         gasPrice: 100000000000,
//     })
//     .on('confirmation', async (confNumber, receipt) => {
//         const { contractAddress } = receipt
//         console.log("Deployed at", contractAddress);
//
//         // Get the deployed contract instance:
//         const contractInstance = new web3.eth.Contract(abi, contractAddress)
//
//         // Call the "getMyName" function and log the result:
//         const myName = await contractInstance.methods.message().call();
//         console.log("Result from blockchain:", myName);
//     })
//     .on('error', (err) => {
//         console.log("Failed to deploy:", err)
//     })
// })();

