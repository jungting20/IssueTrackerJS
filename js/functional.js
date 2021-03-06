!function(){
    const curry2 = f => (...args) => args.length < 2 ? (...args2) => f(...args,...args2) : f(...args);

//    const pipe = (...fs) => arg => fs.reduce((arg, f) => f(arg),arg);

    //const pipe = (...fs) => arg => fs.reduce((arg,f) => f(arg),arg);
    const pipe = (...fs) => (arg) => reduce((arg2,f) => f(arg2),arg,fs)

    const go = (arg,...fs) => pipe(...fs)(arg);
    //const go = (arg,...fs) => reduce((arg,f) => f(arg),arg,fs);
    const tab = curry2((f,arg) => (f(arg),arg));

    const loging = tab(a => console.log('값 확인',a));

    const isTruthy = f => truthy => truthy && f(truthy);
    pipe.isTruthy = (...fs) => isTruthy(pipe(...fs));

    function* valuesIterObj(obj){
        if(!obj) return;
        for (const key in obj) yield obj[key];
    }

    function* entriesIterObj(obj){
                if(!obj) return;
                for(const key in obj) yield [key,obj[key]];
            }
            //위 함수는 리듀스를 쓰면서 키 밸류를 알고싶어서 만듬




    function iterColl(coll){
        return coll && coll[Symbol.iterator] ? coll[Symbol.iterator]() : valuesIterObj(coll);
    }





    const reduce = curry2((f,acc,coll) => {
        const iter = iterColl(coll === void 0 ? acc : coll);
//        acc = coll === void 0 ? iter.next().value : acc;
        //오 ㅅㅂ 이렇게 하면 저기 아래 포문은 일단 1번 돈걸로침 next니까
        //[1,2,3][Symbol.iterator()]();
        //for (const item of coll) acc = f(acc,item);
        //기본적으로 for of 는 심볼.이터레이터가 있어야 돌아간다함
        
        return function recur(acc){
            //재귀시에 iter이 for of 이기 때문에 다시 돌때 그 다음부터돔 .next()이거때문임
            //그래서 아마 재귀가 끝나서 처음 재귀가 시작한데로 올라오면 포문이 끝날듯 돌게 없으니
                for (const item of iter) {
                    acc = f(acc,item);
                if(acc instanceof Promise) {return acc.then(recur)};
                }
                return acc;
        } (coll === void 0 ? iter.next().value : acc);

    });

    /* const add = (a,b) => a+b;

    1.go([1,2,3],
       _ => reduce(add,10,_) 
    );

    2.go(10,
       _ => reduce(add,_,[1,2,3]) 
    ); 
    화살표 함수가 충분히 간결하기 때문에 저런식으로 실행해도 충분히 쓸만함 그래서 그렇다함
    뭐 자바스크립트는 너무 가변적이어서 curry2 정도면 된다고함 하나만 구현해서 쓰자
    */


    const find = curry2((f,coll) => {
        for(var val of coll) if(f(val)) return val;
    });

    /* const set = (obj,[k,v]) => {
                obj[k] = v;
                return obj;    
            }; */
            //set({},'a',10);
            //{a:10}
            //set({},['a',10])
            //{a:10} 이렇게 동작하게 하고싶음!
            /* const set = (obj,k,v) => {
                 return typeof k == 'string' ? (obj[k] = v, obj) : set(obj,...k);
            }; */
    const set = (obj,k,v) => typeof k == 'string' ? (obj[k] = v, obj) : set(obj,...k);
    //k가 스트링이 아니면 k는 배열이란 소리니까 전개 연산자로 전개 할 수가 있음 ㅋ

    const push = curry2((arr,...item) => {
        return (arr.push(...item),arr);
    });
    
    const map = curry2((f,coll) => {
        return reduce((obj,val) => go(val,f,push(obj)),[],coll);
    });

    const baseExtend = func => (target,...objs) => reduce(reduce(func),target,map(entriesIterObj,objs));
    /* const extend = (target,...objs) => reduce((target,obj) => reduce(set,target,entriesIterObj(obj))
    ,target,objs); */
    /* const extend = (target,...objs) => 
        //reduce((target,obj) => reduce(set,target,obj),target,map(entriesIterObj,objs));
        reduce(reduce(set),target,map(entriesIterObj,objs));//위에서 중복되는 부분 curry2로 제거 ㅋ */
    const extend = baseExtend(set);
    const defaults = baseExtend((target,[k,v]) => target.hasOwnProperty(k) ? target : set(target,k,v));
    //extend({},entriesIterObj({a:1}),entriesIterObj({b:1}),entriesIterObj({c:1}))
    //extend({},{a:1, d:5},{b:2},{c:5}); 접고 접어야함그래서 리듀스 두번 ㅋ 생각을 항상 해줘야 함

    //extend({a:1},{a:5,b:2},{b:5}) {a:5,b:5}
    //defaults({a:1},{a:5,b:2},{b:5}) {a:1,b:5}

    /* const defaults = (target,...objs) => 
        reduce(reduce(
            (target,[k,v]) => target.hasOwnProperty(k) ? target : set(target,k,v)
            ),target,map(entriesIterObj,objs)); */



    window.Functional = {
        curry2,pipe,reduce,go,find,valuesIterObj,iterColl,entriesIterObj,set,extend,map,defaults,tab,loging
    }
    Object.assign(window, window.Functional);


}();
//사실 이 curry2만 있으면 자바스크립트에서는 다 쓸 수 있음
        /* return function(...args){
            return args.length >= 2 ? f(...args) : (...args) => f(a,...args); //51분
        } */
        //f.apply(null,array) 이걸 그냥 f(...array) 이렇게 쓸 수 있게 바뀐거임 ㅋ 이것이 ema6 인듯
