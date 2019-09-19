const { Router } = require("express")
const router = Router()
const http = require("http")
const fs = require("fs")
const multer = require("multer")
const mime = require("mime")
const { promisify } = require("util")

const readStore = promisify(fs.readFile)

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    // cb(null, req.body.fileName + "." + mime.extension(file.mimetype))
    cb(null, req.body.fileName)
  }
})

const upload = multer({ storage: storage })

router.get("/", (req, res) => {
  res.render("index")
})

router.get("/download", async (req, res) => {
  let data = await readStore("store.json")
  let table = JSON.parse(data)
  let items = table.table
  res.render("download", { items })
})

router.post("/", upload.single("upload"), (req, res) => {
  // fs.appendFile("store.json", req.body.fileName, err => err && console.log(err))
  console.log()
  let obj = { fileName: req.body.fileName, fileDesc: req.body.fileDesc }
  fs.readFile("store.json", (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let store = JSON.parse(data)
      // console.log(store)
      store.table.push(obj)
      let json = JSON.stringify(store)
      fs.writeFile("store.json", json, err => err && console.log(err))
    }
  })
  res.render("index")
})

router.post("/getDownload", (req, res) => {
  // console.log(req.body)

  fs.readFile("store.json", (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let store = JSON.parse(data)
      let file = store.table[req.body.value].fileName

      fs.readFile(`./uploads/${file}`, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log("hi")
        }
      })
    }
  })

  res.send({ data: "Response", id: req.body })
})

module.exports = router

// const http = require('http');
// const fs = require('fs');

// const file = fs.createWriteStream("file.jpg");
// const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
//   response.pipe(file);
// });
