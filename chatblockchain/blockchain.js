const SHA256 = require("crypto-js/sha256");

class Block{

  constructor(packet = {
    userName:"",
    msg:""
  },preHash){
    this.packet = packet;
    this.preHash = preHash;
    this.timeStamp = new Date().getTime();
    this.nonce = 0;
    this.hash = calculateHash();
  }

  calculateHash(){
    return SHA256(this.preHash + this.timeStamp + this.nonce + JSON.stringify(this.packet));
  }

  difficulty(d = 0){
    return new String(new Array(length = d + 1)).replace(/,/g,"0")
  }

  proof(){
     
  }
}

module.exports = Block;