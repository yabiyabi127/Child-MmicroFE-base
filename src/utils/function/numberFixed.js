export function fixed(num=0, fix=0){
    const prec1 = Math.pow(10, fix)
    const prec2 = Math.pow(10, fix+1)
    return(Math.round((Math.round(num * prec2) / prec2) * prec1) / prec1)
}