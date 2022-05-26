const {replace} = require('./modules')
const fs = require('fs')

const htmlPath = (process.argv[2] !=undefined ? process.argv[2]:"./index.html")
const html = fs.readFileSync(htmlPath, "utf-8")

const cssPath = (process.argv[2] !=undefined ? process.argv[3]:"./css")
const css = fs.readFileSync(cssPath, "utf-8")

const jsonPath = (process.argv[2] !=undefined ? process.argv[4]:"./css")
const json = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) 

if(!fs.existsSync('./build')) fs.mkdirSync("./build")

let result = replace(json, css, html)

let newHtml = result.html
let newCss = result.css


fs.writeFileSync("./build/html.html", newHtml,"utf-8")
fs.writeFileSync("./build/css.css", newCss,"utf-8")