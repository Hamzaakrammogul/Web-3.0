const Tx = require('ethereumjs-tx').Transaction

const Web3= require('web3');
const web3 = new Web3('https://goerli.infura.io/v3/f9088ceaa1444035b0ab88ba1f1f0c9f');
//console.log(web3.eth.accounts.create())
const account1= '0xf2aB85a5e4865631230A26EAac4741BA736fB785'
const privateKey1 =Buffer.from('887f4c88e171b054ab67669b16e99028b28b872675d6cc24cb5b7c52e9c91295', 'hex')
//console.log(web3.eth.accounts.create())
const account2= '0x3bD0359740F05CE98739Feaf4EB9B7058d3FDF82'
const privateKey2= Buffer.from('ad55067ba55005c8dfd0cdd1e423ee7e8b14e03dd05f9658282a0b33fb596444', 'hex')

const contractAddress= '0x437b22c49DfAA66d497F4595ab14Ed7501C70547'
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
//Instantiate new contract basically its gonna be js representation of our contract.
const tokenContract= new web3.eth.Contract(contractABI, contractAddress)
const data= tokenContract.methods.transfer(account2, 1).encodeABI()
console.log(data)

web3.eth.getTransactionCount(account1, (err, txCount)=>{

//create transaction object 
const txObject={
    nonce: web3.utils.toHex(txCount),
    gaslimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex('10', 'gwei'),
    to:contractAddress,
    data: data
}
//Sign the transaction
const tx = new Tx(txObject, {chain:'goerli'})
tx.sign(Buffer.from(privateKey1.slice(2), "hex"))

const serializedTransaction = tx.serialize()
const raw = '0x' + serializedTransaction.toString('hex')
//Broadcast the transaction 
web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
    console.log('err:', err)
    console.log('txHash:', txHash)
})
})
