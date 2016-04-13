module.exports = {
    voteStart: function(username, userslist, votedList){
       if(votedList.length > 0){
          var shouldAdd = true;
          votedList.forEach(function(voted){
              if(username === voted){
                  shouldAdd = false;
              }
          });
          if(shouldAdd){
              votedList.push(username);
          }
       }else{
           votedList.push(username);
       }
       if(userslist.length === votedList.length && userslist.length >= 3){
           return true;
       }else{
           return false;
       }
    },
    firstRoll: function(username, playersOrder, playersQtd){
        var rollValue = Math.floor(Math.random() * (7 - 1))+ 1;
        if(playersOrder.length > 0){
          var shouldAdd = true;
          playersOrder.forEach(function(rolled){
              if(username === rolled){
                  shouldAdd = false;
              }
          });
          if(shouldAdd){
              playersOrder.push({username: username, rollValue: rollValue});
          }
       }else{
           playersOrder.push({username: username, rollValue: rollValue});
       }
       if(playersQtd === playersOrder.length){
           return true;
       }else{
           return false;
       }
    }
}