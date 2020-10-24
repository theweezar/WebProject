const SHA256 = require("crypto-js/sha256");

class Block{

  constructor(packet = {
    userName:"",
    msg:""
  },preHash = ""){
    this.packet = packet;
    this.preHash = preHash;
    this.timeStamp = new Date().getTime();
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return SHA256(this.preHash + this.timeStamp + this.nonce + JSON.stringify(this.packet)).toString();
  }

  difficulty(d = 0){
    return new String(new Array(d + 1)).replace(/,/g,"0");
  }

  makeProof(diff = 0){
    let target = this.difficulty(diff);
    while(target !== this.hash.substring(0,diff)){
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

module.exports = Block;