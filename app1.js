const Tx = require('ethereumjs-tx').Transaction

const Web3= require('web3');
const web3 = new Web3('https://goerli.infura.io/v3/f9088ceaa1444035b0ab88ba1f1f0c9f');
//console.log(web3.eth.accounts.create())
const address1= '0xf2aB85a5e4865631230A26EAac4741BA736fB785'
const privateKey1 =Buffer.from('887f4c88e171b054ab67669b16e99028b28b872675d6cc24cb5b7c52e9c91295', 'hex')
//console.log(web3.eth.accounts.create())
const address2= '0x199C4E5A6ECB30080833ba014a0A94295117E273'
const privateKey2= Buffer.from('0x96e96c6d493ef5395ac22bdd662cf9f11ce5710973dc2d338281f286586ddae5', 'hex')
web3.eth.getBalance(address1, (err, bal)=>{console.log('address 1 balance:', web3.utils.fromWei(bal, 'ether'))})
web3.eth.getBalance(address2, (err, bal)=>{console.log('address 2 balance:', web3.utils.fromWei(bal, 'ether'))})
web3.eth.getTransactionCount(address1, (err, txCount)=>{
//Build the transation
const txObject={
    nonce: web3.utils.toHex(txCount),
    to: address2,
    value:web3.utils.toHex(web3.utils.toWei('1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
}
//Sign the transaction
const tx = new Tx(txObject, {chain:'goerli'})
tx.sign(privateKey1)

const serializedTransaction = tx.serialize()
const raw = '0x' + serializedTransaction.toString('hex')
//Broadcast the transaction 
web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
    console.log('err:', err)
    console.log('txHash:', txHash)
})
})