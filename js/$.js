!function() {
    
    //functional.js에 window.Functional 에 객체로 등록 되어있음 ㅋ 그걸 ecma6에서는 이렇게 뺴다 쓸 수 있다.!
    const { curry2,find,reduce,entriesIterObj,set,extend,map,defaults } = Functional;


    const baseSel = method => (sel,parent = document) => parent[method](sel);

    const $ = baseSel('querySelector');
    $.find = curry2($);
    $.all = baseSel('querySelectorAll');
    $.findAll = curry2($.all);
    //접근자는 웬만하면 앞에인자로두고 주 재료는 항상 뒤에 

    //문자열을 html 로 만들기 위해 만든 함수 ㅋ 
    $.el = html => {
    const parent = document.createElement('div');
    parent.innerHTML = html;
    return parent.children.length == 1 ? parent.children[0] : parent.children;
    };


    //$.append = curry2((parent,element) => parent.appendChild(element));
    //const addEvent = (target,eventName,f) => target.addEventListener(eventName,f) ;
    //위 두개는 공통점이있음 첫번쨰인자의 메서드로 나머지 인자를 실행함! 이거를 찾아내서 만든게
    //아래 method로 추상해 준거임 그래서
    //비슷한 형식은 다 이걸로 갖다 쓸 수 있다
    const method = name => (obj,..._) => obj[name](..._);

    $.append = curry2(method('appendChild'));
    //appendChild 는 리턴값이 element 이거임

    const addEvent = method('addEventListener');

 /*    const find = curry2((f,coll) => {
        for(var val of coll) if(f(val)) return val;
    }); */


    $.on = function(el, eventName,sel,f) {
        if (typeof el == 'string') return el => $.on(el,...arguments);
        if (typeof sel !='string') return addEvent(...arguments);
        //if(arguments.length == 3) return el => $.on(el,...arguments);뺏음
            //var args = arguments;
        /*  return function(el){
            console.log(arguments);
            return $.on(el,...args);
        } */  
        //화살표함수는 arguments 이거를ㅇ 바인딩하지 않음 이게 다른점임!!! 후
        //위에처럼 짜야하는걸 화살표함수로하면 아래처럼가능 그니까 arguments 공유가능 원래안되는데 ㅋ

        el.addEventListener(eventName, e => go(
                el,
                $.findAll(sel),
                find(el => el.contains(e.target)),
                ct => ct && f(defaults({originalEvent : e,currentTarget:ct,delegateTarget:el},e))
            ));
    };  
        //$.on('click',f)();
        //$.on('click','ul li',f)    

        //$.on(el,'click',f);
        //$.on(el,'click','ul li',f);

            /* const currentTarget = find(el => el.contains(e.target),$.findAll(sel,el));
            if(currentTarget) {
            f(defaults({originalEvent : e,currentTarget,el},e));
            } */
            //if(currentTarget) f(Object.assign({ currentTarget, originalEvent : e },e));
            //이거 이렇게하면 변수명하고 그 값이 변수명:값 객체로 만들어짐
            //e는 이벤트 객체니까 그냥 다 덮어버린다 즉 currentTarget에 이벤트가 다 들어감 원래 이벤트가 
            //하 원래 객체에 변수 넣으면 변수:값 이렇게 만들어짐 후..{currentTarget} 이렇게 하면 
            //리턴값은 currentTarget:값 몰랐다 이건
            //저렇게 이벤트객체 자체를 쳐 합쳐서 넣어주는거임 그러면 이벤트값들ㄹ 쓸 수 있지
            //console.log(e);
            //e에는 이미 currentTarget 라는 프로퍼티가있음

            /* const newEvent = {};
            for (const key in e) newEvent[key] = e[key]; */
            // 위에 포문은 객체복사과정 2시간부터 였음
            //Object.assign(newEvent,{originalEvent : e,currentTarget,el});
            //const newEvent = reduce(set,{},entriesIterObj(e))
            //Object.assign(reduce(set,{},entriesIterObj(e)),{originalEvent : e,currentTarget,el});
            //객체복사 버전 2
            /* const newEvent = Object.assign(reduce(set,{},
            entriesIterObj(e)),
            {originalEvent : e,currentTarget,el}) */
            //f(extend({},e,{originalEvent : e,currentTarget,el}));
             
/* 
            const newEvent = extend({},e,{originalEvent : e,currentTarget,el});
            f(newEvent); */
            //이벤트복사

    window.$ = $;
}();

