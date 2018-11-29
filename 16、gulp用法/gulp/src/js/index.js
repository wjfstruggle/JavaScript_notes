let ac = 12;

const fn = () => {
    console.log(this)
}

var t = setInterval(()=> {
    console.log("你好")
}, 1200)

/**
 *
 *
 * @param {*} param
 * @param {*} name
 * @returns
 */
function fn2(param, name) { 
    return param + name;
}

let b = 12;
