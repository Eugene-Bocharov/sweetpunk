module.exports = (json)=>{
    let tabCount = 0
    let normalaizedJson = ''
    let tab = '    '

    for(let i = 0; i<json.length; i++){
        normalaizedJson += json[i]
        if(json[i] == "{"){
            tabCount++
            normalaizedJson += ('\n')
            normalaizedJson += tab.repeat(tabCount)
            i -= 2
        }
    }
    return normalaizedJson
}