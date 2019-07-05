module.exports = {
  contentType : (type = '') => {
    switch (type) {
      case '.html':
        return {'Content-type':'text/html'};
      case '.css':
        return {'Content-type':'text/css'};
      case '.js':
        return {'Content-type':'text/javascript'};
      case '.json':
        return {'Content-type':'application/json'};
      case '.jpg':
        return {'Content-type':'image/jpg'};
      case '.png':
        return {'Content-type':'image/png'};
      case '.jpeg':
        return {'Content-type':'image/jpeg'};
      default:
        break;
    }
  }
};