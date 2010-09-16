(function($){
  $.extend({
    listeners : [],
    listen_for: function(opts){ $.listeners.push(opts); },
    broadcast : function(opts){ 
      $.each($.listeners, function(i,o){
        if(opts.message == o.message){
          if(o.delegate) o.delegate(opts);
          if(o.delegates) $.each(o.delegates, function(j,d){ d(opts); });
        }
      });
    } 
  });

  $(function(){
    //jQuery Broadcast Extensions
    $("form").live("submit", function(e){ 
      $.broadcast({message:"submitInvoked", sender:$(this), event:e});
    });
    $("input[type=text]").live("blur", function(e){
      var s = $(this);
      $.broadcast({message:"textFieldBlur", sender:s, event:e, data:s.val()});
    });
  });

  //$.broadcast({message:"hi", sender:this, data:{name:"Jerry", age:25}});
})(jQuery);



