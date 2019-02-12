const ecc = eosjs_ecc;

let resp = (res, method, rd) => {
    window.postMessage(JSON.stringify({
        res,
        method,
        rd,
        code: 0
    }));
}

window.onload = () => {
    document.addEventListener('message', e => {
        try{
            let {method, rd, params} = JSON.parse(e.data);
            if(method && rd && ecc[method]){
                if(method === 'randomKey'){
                    ecc[method]().then(res => resp(res, method, rd))
                }else{
                    let res = ecc[method](...params);
                    resp(res, method, rd);
                }
            }else{
                window.postMessage(e.data);
            }
        }catch(err){
            alert(err.message);
            window.postMessage(e.data);
        }
    })   
}