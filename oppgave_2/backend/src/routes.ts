import express from 'express';

const router = express.Router()
const contractFormH = require("./contact-form")

router.post("/Contact", contractFormH.postMessage)

router.get("/Contact", contractFormH.getMessage)

router.get("/Contact:/id", contractFormH.getMessageByID)


module.exports = router
