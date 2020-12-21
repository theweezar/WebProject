const express = require("express")
const app = express()
const PORT = 5005 | process.env.PORT

app.get("/", (req, res) => {
  res.send("start")
})

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

