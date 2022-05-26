const fs = require('fs')
const {searchForArtibuts, buildCssSelectors, combainCssHtml} = require("./modules")
const norm = require('./normalizeJson')

const htmlPath = (process.argv[2] !=undefined ? process.argv[2]:"./index.html")
const html = fs.readFileSync(htmlPath, "utf-8")

const cssPath = (process.argv[2] !=undefined ? process.argv[3]:"./css")
const css = fs.readFileSync(cssPath, "utf-8")


if(!fs.existsSync('./build')) fs.mkdirSync("./build")

let classesHtml = searchForArtibuts('class', html)
let classesCss = buildCssSelectors('.', css)
let classes = combainCssHtml(classesCss, classesHtml)


let idHtml = searchForArtibuts('id', html)
let idCss = buildCssSelectors('#', css)
let id = combainCssHtml(idCss, idHtml)


fs.writeFileSync("./build/class-list-html.json", JSON.stringify(classesHtml, null, 5),"utf-8")
fs.writeFileSync("./build/class-list-css.json", JSON.stringify(classesCss, null, 5),"utf-8")
fs.writeFileSync("./build/class-list.json", JSON.stringify(classes, null, 5),"utf-8")

fs.writeFileSync("./build/class-transform.json", JSON.stringify(classes, null, 5),"utf-8")

fs.writeFileSync("./build/id-list-html.json", JSON.stringify(idHtml, null, 5),"utf-8")
fs.writeFileSync("./build/id-list-css.json", JSON.stringify(idCss, null, 5),"utf-8")
fs.writeFileSync("./build/id-list.json", JSON.stringify(id, null, 5),"utf-8")

fs.writeFileSync("./build/id-transform.json", JSON.stringify(id, null, 5),"utf-8")

