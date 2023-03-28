

function init() {
    console.log("user");
    var user_name = '';
    var user_id;
    var usingRoom;
    firebase.auth().onAuthStateChanged(function (user) {
        // Check user login
        if (user) {
            if (user.displayName === null)  user_name = user.email;
            else    user_name=user.displayName;
            user_id=user.uid;
            
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
    var NowUsing = firebase.database().ref('UserUsing');
    var flag = 0;
            NowUsing.once('value').then(function(snapshot){
                for (var i in snapshot.val()){
                    if (snapshot.val()[i].User === user_id) {
                        usingRoom=snapshot.val()[i].UsingRoom;
                        console.log(snapshot.val()[i].key);
                        firebase.database().ref('UserUsing').remove();
                        flag = 1;
                        break;
                    }
                    //console.log(usingRoom);
                }
                if (flag ===0){
                    alert("Busy");
                    window.location="roomList.html";
                }  
            });
    
    var talk_txt = document.getElementById('666');
    var submit_btn = document.getElementById('a');
    var postsRef = firebase.database().ref('private_chat');
    submit_btn.addEventListener('click', function () {
        console.log("0 0 ");
        if (talk_txt.value !== "") {
            postsRef.push({name:user_name, message:talk_txt.value, room:usingRoom, userId: user_id});
            talk_txt.value = "";
        }
    });

    var total_post = [];

    postsRef.once('value')
        .then(function (snapshot) {
            console.log(snapshot);
            for (var i in snapshot.val()) {
                if (usingRoom === snapshot.val()[i].room){
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
                }
                document.getElementById('chat_space').innerHTML = total_post;
            }

            postsRef.on('value', function (snapshot) {
                total_post = [];
                document.getElementById('chat_space').innerHTML = "";
                
                for (var i in snapshot.val()) {
                    if (usingRoom === snapshot.val()[i].room){
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
};