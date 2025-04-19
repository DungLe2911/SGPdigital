
const authCheck = async()=>{
    return new Promise<boolean>((resolve)=>{
        setTimeout(()=> resolve(true), 500);
    })
}

export {authCheck}