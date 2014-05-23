var socket;
$(document).on('ready',function(){
	socket = io.connect('http://192.168.1.128:60000');
	$(document).keypress(function(e) {
		    if(e.which == 13) {
				$('#send').trigger('click');
			}
	});
	$('#send').on('click',function(){
		socket.emit('chat', { username: username,message: $('#chatInput').val()});
		$('#chatInput').val('');
	});
	socket.emit('ping', { username: username});
	setInterval(function(){
		socket.emit('ping', { username: username});
	},3000);
	socket.on('chatMessage', function (data){
		if (data.message && data.username){
			$('#chat').append('<b>'+data.username+': </b>'+data.message+'<br />');
		}
	});
	socket.on('userlist', function (data) {
		if(data.list){
			var userList = '<ul>';
			for (var i=0;i<data.list.length;i++){
				userList += '<li>'+data.list[i]+'</li>';
			}
			userList += '</ul>';
			$('#connectedUsers').html(userList);
		}
	});
});
