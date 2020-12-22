const express = require("express")
const app = express()
const PORT = 5005 | process.env.PORT
const NodeWebcam = require("node-webcam")
const path = require("path")
const IO = require("socket.io")
const fps = 1000/60;

//Default options

const opts = {

  //Picture related
  width: 640,

  height: 360,

  quality: 100,
  // Number of frames to capture
  // More the frames, longer it takes to capture
  // Use higher framerate for quality. Ex: 60
  frames: 60,

  //Delay in seconds to take shot
  //if the platform supports miliseconds
  //use a float (0.1)
  //Currently only on windows
  delay: 0,

  //Save shots in memory
  // saveShots: true,

  // [jpeg, png] support varies
  // Webcam.OutputTypes
  output: "jpeg",

  //Which camera to use
  //Use Webcam.list() for results
  //false for default device
  device: false,

  // [location, buffer, base64]
  // Webcam.CallbackReturnTypes
  callbackReturn: "base64",

  //Logging
  verbose: false
}

app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'node_modules','socket.io','client-dist')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'public','index.html'));
})



const server = app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

const io = IO(server)

io.on("connection", socket => {
  socket.emit("connect_to_server", "connection is established")

  socket.on("start_webcam", function(){
    const recording = setInterval(function(){
      NodeWebcam.capture("test_picture", opts, ( err, data ) => {
        if (err) clearInterval(this);
        else socket.emit("recording", {img: "<img src='" + data + "'>"});
      });
    }, fps);
  })
})
