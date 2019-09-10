const express = require("express")
const hbs = require("express-handlebars")
const path = require("path")
const bodyParser = require("body-parser")
const routes = require("./routes/index")
// const fileUpload = require("express-fileupload")

// Init express
const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ encoded: false }))
app.use(bodyParser.json())
// app.use(fileUpload())

// Default handlebars setup
app.engine(
  ".hbs",
  hbs({
    defaultLayout: "layout",
    extname: ".hbs"
  })
)

// Telling app we are using the handlebars engine.
app.set("view engine", ".hbs")

app.use("/", routes)

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
