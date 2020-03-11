// blob:https://www.youtube.com/fb58ddd4-a205-4f2b-a64c-6193c0b7277b
// blob:http%3A//your.blob.url.here
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.youtube.com/watch?v=FN7ALfpGxiI', true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  if (this.status == 200) {
    var myBlob = this.response;
    // myBlob is now the blob that the object URL pointed to.
    console.log(myBlob)
  }
};
xhr.send();

// let blob = fetch('https://www.youtube.com/fb58ddd4-a205-4f2b-a64c-6193c0b7277b')
//   .then(rs => {
//     rs.blob()
//   })
//   .then(rs => {
//     console.log(rs)
//   })
//   .catch(err => {
//     throw err;
//   });