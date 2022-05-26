function searchForArtibuts(atribut, html) {
    html = html.split('')
    let isSimple = true
    atribut+="="
    let atributs = {
        addAtributPosition(value, position){
            if(value.length){
                if (this[value] != undefined){
                    this[value].dependences.push(position)
                }
                else{
                    this[value] = {
                        value,
                        dependences: [position]
                    }
                }
            }
            
        },
        get length(){
            let length = 0
            for(let key in this){
                length++
            }
            return length
        }
    }
    
    for(let i = 0; i<html.length;i++){
        isSimple = true
        for(let w = 0; w<atribut.length;w++){
            if (html[i+w]!=atribut[w]){
                isSimple = false
                w = atribut.length
                
            }
           
        }
        if (isSimple) readValue(i, html, atributs)
    }
    return atributs
}
 
function readValue(ind, html, atributs){
    let value = ''
    let isValueOpened = false
    let startPoint = ind
    for(let pos = ind; pos<html.length;pos++){
        if(isValueOpened){
            if(html[pos]=='"' || html[pos]=="'"){
                atributs.addAtributPosition(value, startPoint)
                value = ''
                break
            }
            else if(html[pos]==" "){
                atributs.addAtributPosition(value, startPoint)
                value = ''
                startPoint = pos + 1
            }
            else{
                value += html[pos]
            }
            
        }
        else{
            if(html[pos]=='"' || html[pos]=="'"){
                isValueOpened = true
                startPoint = pos+1
            }
        }
    }
}
function buildCssSelectors(selector, css){
    css = css.split('')
    let value = ''
    let dotPoint = 0
    let values = {
        addValuePosition(value, position){
            if(value.length){
                if (this[value] != undefined){
                    this[value].dependences.push(position)
                }
                else{
                    this[value] = {
                        value,
                        dependences: [position],
                    }
                }
            }
            
        },
        get length(){
            let length = 0
            for(let key in this){
                length++
            }
            return length
        }
    }
    let string = false
    let comment = false

    for(let i = 0; i<css.length;i++){
        if (css[i]== string) {
            string = false
        }
        else if(css[i] == '"' || css[i] == "'" ) {
            string = css[i]; 
        }
        if(css[i]+css[i+1] == '/*'){
            comment = true
        }
        else if (css[i] + css[i+1] == '*/'){
            comment = false
        }

        if(!string && !comment){
            if(css[i] == selector){
                i++
                dotPoint = i
                while (css[i] != "." && css[i] != " " && css[i] != ":" && css[i] != "{" && i<css.length){
                    value += css[i]
                    i++
                }
                values.addValuePosition(value, dotPoint)
                value = ''
            }
        }


    }
    return values
}

function combainCssHtml(css, html){
    let values = {}

    for(let key in html){
        if(typeof html[key] == 'object'){
            values[key] = {
                htmlDependences: html[key].dependences,
                cssDependences: [],
                transformTo: 'none'
            }
            
            if(key in css){
                values[key].cssDependences = css[key].dependences
            }
        }
        
    }

    return values
}

//-------------------------------------------


function replace(transform, css, html){
    let result
    for(let key in transform){
        if(transform[key].transformTo != 'none'){
            result = changeValue.apply(transform, [transform[key].transformTo, html, css, key])
            html = result.html
            css = result.css
        }
    }
    return {html, css}

}
function changeValue(newValue, html, css, key){
    let cof = newValue.length - key.length
    if(this[key] == undefined){
        console.error("ChangeValue must be callsed with apply(yourobjekt, [args])")
    }
    let val = this[key]
    val.htmlDependences.forEach((htmlDep)=>{
        let substr2 = html.slice(htmlDep+key.length, html.length)
        let substr = html.slice(0, htmlDep)
        html = substr + newValue + substr2
        for(let valAttr in this){
            this[valAttr].htmlDependences.forEach((el, i)=>{
                if(el > htmlDep) this[valAttr].htmlDependences[i]+=cof
            })
        }
    })
    val.cssDependences.forEach((cssDep)=>{
        let substr2 = css.slice(cssDep+key.length, css.length)
        let substr = css.slice(0, cssDep)
        css = substr + newValue + substr2
        for(let valAttr in this){
            this[valAttr].cssDependences.forEach((el, i)=>{
                if(el > cssDep) this[valAttr].cssDependences[i]+=cof
            })
        }
    })
    this[newValue] = this[key]
    delete this[key]
    return {html,css}
}
module.exports = {
    readValue,
    searchForArtibuts,
    buildCssSelectors,
    combainCssHtml,
    replace
}