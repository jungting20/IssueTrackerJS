!function(){

//const {go,pipe,map,reduce,extend,reduce} = Functional;


const tmpl = _ => `
    <div class="page editor">
    <div class="container">
    <div class="header">
        <div class="options">
        <button type="button" class="cancel">취소</button>
        <button type="button" class="save">저장</button>
        </div>
    </div>
        <div class="body">
        <div class="user_name"><input type="text" name="user_name"></div>
        <div class="name"><input type="text" name="name"></div>
        <div class="description"><textarea name="description"></textarea></div>
        </div>
    </div>
    </div>
    `;
    
    const show = _ => new Promise(resolve => go(
            null,
            tmpl,
            $.el,
            $.append($('#app')),
            $.on('click','.options .save', e => go(
                    e.delegateTarget,
                    $.formToJSON,
                    resolve,
                    //Promise 객체의 첫번쨰 인자로 받은 resolve는 항상 마지막에 실행됨 
                    //그니까 여기서는 인자만 받아놓고 실행은 나중에
                    () => e.delegateTarget, //걍 위에 있는 e를 리턴해줘버림 
                    $.remove//지운값을 리턴함
                    //console.log
                  /* {
                    name : go(e.delegateTarget,$.find('.name input'),$.val),
                    description : go(e.delegateTarget,$.find('.description textarea'),$.val)
                  } */
                    )),
//                    tab(a => console.log('아무도모르죠~',a)),
                 $.on('click','.options .cancel', e => go(
                    e.delegateTarget,//e.delegateTarget 이거로 자기자신을 표현
                    $.remove,
                    //loging,
                    _ => resolve()
                ))
                //커링해서 이런일이 가능함 ㅋ 이렇게 하는거군
            //function(editorEl){
                //$.find('.save')(editorEl).onclick = console.log;
                /* go(editorEl,
                $.find('.save')).onclick = console.log; */
                //$.on(editorEl,'click','.save', console.log)
                //$.on(editorEl,'click','.option', function(e){
                 //   console.log(e.currentTarget,'이벤트는 여기 달았음');
                  //  console.log(e.target,'target');
               // });
            //}
    ));

    Task.editor = {
        show,
    }
}();