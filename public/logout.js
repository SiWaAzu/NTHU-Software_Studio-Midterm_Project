

function init() {
    console.log("user");
    var user_name = '';
    var user_id;
    firebase.auth().onAuthStateChanged(function (user) {
        // Check user login
        if (user) {
            if (user.displayName === null)  {
                user_name = user.email;
                new Notification('Suggest New Nick Name');
            }
            else    user_name=user.displayName;
            user_id = user.uid;
            
            console.log("user");
            var logout_btn = document.getElementById("logout-btn")
            logout_btn.addEventListener('click', function () {
                console.log("try");
                firebase.auth().signOut()
                .then(function () {
                    // Sign-out successful.
                    console.log(user.displayName);
                    alert("Log out Successed!");
                    window.location.href = "index.html";
                })
                .catch(function () {
                    // An error happened
                    alert("ERROR!")
                });
            })
        } 
    });
    

    var talk_txt = document.getElementById('666');
    var submit_btn = document.getElementById('a');
    var postsRef = firebase.database().ref('loby_chat');
    submit_btn.addEventListener('click', function () {
        console.log("0 0 ");
        if (talk_txt.value !== "") {
            postsRef.push({name:user_name, message:talk_txt.value, userId: user_id});
            talk_txt.value = "";
        }
    });

    var total_post = [];

    postsRef.once('value')
        .then(function (snapshot) {
            console.log(snapshot);
            for (var i in snapshot.val()) {
                var replacemessage = snapshot.val()[i].message.replace(/</g, "&lt;");
                if(user_id === snapshot.val()[i].userId)
                {
                    total_post +=
                    "<div class='talk-self'><p><strong>" + snapshot.val()[i].name + "</strong><br>" + replacemessage + "</p> </div>";
                }
                else {
                    total_post +=
                    "<div class='talk'><p><strong>" + snapshot.val()[i].name + "</strong><br>" + replacemessage + "</p> </div>";
                }
                document.getElementById('chat_space').innerHTML = total_post;
            }

            postsRef.on('value', function (snapshot) {
                total_post = [];
                document.getElementById('chat_space').innerHTML = "";
                
                for (var i in snapshot.val()) {
                    var replacemessage = snapshot.val()[i].message.replace(/</g, "&lt;");
                    if(user_id === snapshot.val()[i].userId)
                    {
                        total_post +=
                        "<div class='talk-self'><p><strong>" + snapshot.val()[i].name + "</strong><br>" + replacemessage + "</p> </div>";
                    }
                    else {
                        total_post +=
                        "<div class='talk'><p><strong>" + snapshot.val()[i].name + "</strong><br>" + replacemessage + "</p> </div>";
                    }
                    document.getElementById('chat_space').innerHTML = total_post;
                    var objDiv = document.getElementById("chat_space");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }
            })
        }).catch(e => console.log(e.message));
}

window.onload = function () {
    init();
    if (!('Notification' in window)) {
        console.log('This browser does not support notification');
      }
      
      if (Notification.permission === 'default' || Notification.permission === 'undefined') {
        Notification.requestPermission(function(permission) {
          if (permission === 'granted') {
            // 使用者同意授權
            console.log('0 0 ');
            var notification = new Notification('Sucess Notified'); // 建立通知
          }
        });
      }
};