$.widget.bridge('uibutton', $.ui.button);

//receive calls from typescript code to update the layouts
var AdminLTE = (function() {
  return {
    init: function() {
      $(function(){
        $.AdminLTE.layout.activate();
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
      });
    }
  }
})(AdminLTE||{});

// $(function () { 
//   $('input').iCheck({
//     checkboxClass: 'icheckbox_flat-blue',
//     radioClass: 'iradio_flat',
//     increaseArea: '20%'
//   });
//   console.log('local script executed');
// });


