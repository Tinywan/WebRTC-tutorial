// async function fun1() {
//     console.log(1);
//     return 1;
// }
//
// fun1().then(x=>{
//     console.log(x) //  输出结果 1， 1
// })

const name = function () {
    return 'Third';
}

async function funName() {
    // wait 关键字 只能放在 async 函数内部
    const a = await 'First'; // 如果await 后面并不是一个Promise的返回值，则会按照同步程序返回值处理
    const b = await new Promise((resolve,reject)=>{
        setTimeout(function () {
            resolve('Second')
        },3000) //
    })
    const c = await name()
    console.log(a,b,c);
}

funName() // 运行结果是 3秒钟之后 First Second Third