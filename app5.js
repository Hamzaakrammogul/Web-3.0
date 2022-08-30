const Web3= require('web3')
const web3= new Web3('https://mainnet.infura.io/v3/f9088ceaa1444035b0ab88ba1f1f0c9f');
//shows the latest block
web3.eth.getBlockNumber().then(console.log)
//shows the hash value of block you can pass blocknumber instead latest too
web3.eth.getBlock('latest').then((block)=>{
    console.log(block.hash)
})
//shows the value of latest 10 blocks 
web3.eth.getBlockNumber().then((latest) => {
    for (let i = 0; i < 10; i++) {
      web3.eth.getBlock(latest - i).then((block)=>{
        console.log(block.number)
      })
    }
  })