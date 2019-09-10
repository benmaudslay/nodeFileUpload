const { Router } = require("express")
const router = Router()
const http = require("http")
const fs = require("fs")
const multer = require("multer")
const mime = require("mime")

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.fileName + "." + mime.extension(file.mimetype))
  }
})

const upload = multer({ storage: storage })

router.get("/", (req, res) => {
  res.render("index")
})

router.post("/", upload.single("upload"), (req, res) => {
  res.render("index")
})

module.exports = router
