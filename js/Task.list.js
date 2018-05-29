!function(){

    const init = $.on('click','.create',e => go(
        null,
        Task.editor.show,
        _ => console.log(_)
    ));
    Task.list = {
        init
    }
}();