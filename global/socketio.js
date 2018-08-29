var io = global.io;


// TODO: Close Socket at 5 mintues of inactivity
module.exports.createConversationSocket = function(conversation_id) {
  if(io.nsps['/' + conversation_id]){
    return;
  }
  var nsp = io.of('/' + conversation_id);
   console.log("nsp of /" + conversation_id);
   nsp.on('connection', function(socket){
     var numUsers = 1;
     var addedUser = false;
     console.log("someone connected");

     socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', data);
        console.log('broadcasting: ', data.message);
      });

       socket.on('disconnect', function () {
         if (addedUser) {
           --numUsers;

           // echo globally that this client has left
           socket.broadcast.emit('user left', {
             username: socket.username,
             numUsers: numUsers
           });
         }
       });
   });
};
