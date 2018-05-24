!function(){
    const curry2 = f => (...args) => args.length < 2 ? (...args2) => f(...args,...args2) : f(...args);

//    const pipe = (...fs) => arg => fs.reduce((arg, f) => f(arg),arg);

    const pipe = (...fs) => arg => fs.reduce((arg,f) => f(arg),arg);

    const go = (arg,...fs) => pipe(...fs)(arg);

    const reduce = curry2((f,acc,coll) => {
        for (const item of coll) acc = f(acc,item);
        return acc;
    });
    const find = curry2((f,coll) => {
        for(var val of coll) if(f(val)) return val;
    });


    Object.assign(window, {
        curry2,pipe,reduce,go,find
    });
}();
//사실 이 curry2만 있으면 자바스크립트에서는 다 쓸 수 있음
        /* return function(...args){
            return args.length >= 2 ? f(...args) : (...args) => f(a,...args); //51분
        } */
        //f.apply(null,array) 이걸 그냥 f(...array) 이렇게 쓸 수 있게 바뀐거임 ㅋ 이것이 ema6 인듯
