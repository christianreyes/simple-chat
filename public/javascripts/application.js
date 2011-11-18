$(function(){
  var socket = io.connect(location.href);
  
  $('input').bind("keydown", function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
     if(code == 13) { //Enter keycode
       sendMessage();
     }
  });

  
  $('button').click(sendMessage);
  
  function sendMessage(){
    var msg = $('input').val();
    $('input').val("");
    socket.emit('msg-to-server', { msg: msg });
  }
  
  socket.on('msg-to-client', function (data) {
    console.log(data);
    
    var new_li = $('<li></li>');
    new_li.text(data["msg"]);
    
    $('ul').append(new_li);
  });
});