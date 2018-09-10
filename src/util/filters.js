
export function myriad(params) {
    // 577213
    return (params/10000).toFixed(1)+'万'
}

export function fill(n){
    if(n<10){
        return '0'+n
    }else{
        return n
    }
}
export function singerName(arr) {
    let name = []
    name = arr.map((item) => {
        return item.name
    })

    return name.join('/')
}