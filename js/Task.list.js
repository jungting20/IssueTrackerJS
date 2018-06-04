!function(){
    const item = {};
    item.tmpl =  task => `<li class="task item">
    <div class="option">
        <button type="button" class="edit">수정</button>
        <button type="button" class="done">완료</button>
    </div>
    <div class="body">
        <h4 class="name">${task.name}</h2>
        <div class="user_name">${task.user_name}</div>
        <div class="description">${task.description}</div>
    </div>
</li>`;

    /* const isTruthy = f => truthy => truthy && f(truthy);
    pipe.isTruthy = (...fs) => isTruthy(pipe(...fs)); */

    const init = 
    pipe(
    $.on('click','.create',e => go(
        null,
        Task.editor.show,
        //loging,
        //요기도 포인트임 진짜 익혀야함 task 가 언디파인드일경우를 생각함
        pipe.isTruthy(
            item.tmpl,
            $.el,//문자열을 엘리먼트로 만들기
        //_ => go(e.delegateTarget,console.log),
            $.append(go(e.delegateTarget,$.find('.task_list')))
        ),
        /*task => task &&  go(
            task,
            item.tmpl,
            $.el,//문자열을 엘리먼트로 만들기
        //_ => go(e.delegateTarget,console.log),
            $.append(go(e.delegateTarget,$.find('.task_list')))
        ) */


        //Promise를 리턴하는함수야 그러니까 go로 했으니까 .then 으로 접근 하겠지 그니까 인자 넘어올때까지 기다림.
        //Task.editor.js여기서 resolve 실행 할 때 까지 기다린다는거지,
        //그니까 resolve 로 넘긴 인자를 받아오는거임
        //task => console.log(task,'sadsad'),
        //순서 Task.editor.show -> return Promise 객체 -> 기다림 이 후는 리턴될때까지실행되지않음
        //->Promise 객체기 떄문이지 -> 클릭으로 눌렀어 -> resolve는 항상 제일 마지막에 실행되니까
        // -> 얘는 Promise 객체 리턴이니까 resolve로 넘긴 값이 go에 의해 일반 값으로 변환된 후
        //-> 다음값으로 넘김
)),
    $.on('click','.task.item .done',e => go(
        e.currentTarget,
        loging,
        $.closest('.task.item'),
        loging,
        $.remove
    )),
    $.on('click','.task.item .edit',e => go(
        e.currentTarget,
        $.closest('.task.item'),
        $.findAll('.body > *'),
        loging,
    ))

);

    
    Task.list = {
        init
    }
}();