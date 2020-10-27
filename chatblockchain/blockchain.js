const Block = require("./block");

class BlockChain{

  constructor(){
    this.chain = [];
    this.unvb = [];
  }

  lastBlock(){
    return this.chain[this.chain.length - 1];
  }

  getChain(){
    return this.chain;
  }

  addBlock(userName = "", msg = ""){
    let hash = this.chain.length == 0 ? "0" : this.lastBlock().hash;
    let block = new Block({
      userName: userName,
      msg:msg
    }, hash);
    block.makeProof(3);
    this.chain.push(block);
  }

  processQueue(){
    
  }

  isChainValid(){
    for(let i = 1; i < this.chain; i++){
      let currentBlock = this.chain[i];
      let previousBlock = this.chain[i - 1];
      if (currentBlock.hash != currentBlock.calculateHash()){
        console.log("Current Block 's Hashes not equal");
        return false;
      }
      if (previousBlock.hash != currentBlock.preHash){
        console.log("Previous Block 's Hashes not equal");
        return false;
      }
    }
    return true;
  }

  printChain(){
    this.chain.forEach(b => {
      console.log(b);
    })
  }

}

module.exports = BlockChain;

// let blockchain = new BlockChain();
// blockchain.addBlock("duc","Hello World");
// blockchain.addBlock("dai","Hello");
// blockchain.addBlock("dong","Hi");
// blockchain.printChain();
// if (blockchain.isChainValid()) console.log("\nBlock chain is valid");