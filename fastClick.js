// fastclick button binding
$.fn.touch = function(selector,fnctn){
  return this.each(function(){
    var $this = $(this),
        _opt = {
          fn: $.isFunction(selector) ? selector : fnctn,
          sel: !$.isFunction(selector) ? selector : undefined
        },
        _touches = {},
        _hasScrolled = false,
        namespace = _opt.fn.name ? _opt.fn.name : new Date().getTime(),
        events = ["touchstart","touchmove","touchend","touchcancel","click"];


    $this.on(events.join("."+namespace+" "),_opt.sel,function(e){

      if(e.type === "click"){
        e.preventDefault();
      }
      if(e.type === "touchstart" || e.type === "touchmove") {
        //log touch position
        if(e.type === "touchstart"){
          e.stopPropagation();
          _touches.start = {
            pageX: e.pageX,
            pageY: e.pageY
          };
          //reset move position on start
          delete _touches.move;
        }else{
          _touches.move = {
            pageX: e.pageX,
            pageY: e.pageY
          };
        }
        if(_touches.move && (Math.abs(_touches.start.pageX - _touches.move.pageX) >= 10 || Math.abs(_touches.start.pageY - _touches.move.pageY) >= 10)){
          _hasScrolled = true;
        }
      }
      if(e.type === "touchend" && !_hasScrolled){
        _opt.fn(e);
      }else if(e.type === "touchend" && _hasScrolled){
        _hasScrolled = false;
      }
    });

  });
};
