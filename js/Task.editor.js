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
    
    const show = _ => go(
            null,
            tmpl,
            $.el,
            $.append($('#app')),
           /*  $.find('.save'),
            saveBtn => saveBtn.onclick = console.log */
            $.on('click','.options .save', e => go(
                    e.delegateTarget,
                    $.formToJSON,
                    console.log,
                  /* {
                    name : go(e.delegateTarget,$.find('.name input'),$.val),
                    description : go(e.delegateTarget,$.find('.description textarea'),$.val)
                  } */

                )
                ),//커링해서 이런일이 가능함 ㅋ 이렇게 하는거군
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
    )

    Task.editor = {
        show,
    }
}();