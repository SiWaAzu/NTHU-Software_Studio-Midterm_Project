function init() {
    var user_email = '';
    var user_id="";
    firebase.auth().onAuthStateChanged(function (user) {
        // Check user login
        if (user) {
            user_email = user.email;
           user_id=user.uid;
            var logout_btn = document.getElementById("logout-btn");
            logout_btn.addEventListener('click', function () {
                console.log("try");
                firebase.auth().signOut()
                .then(function () {
                    // Sign-out successful.
                    console.log(user.email);
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
    var roomName = document.getElementById('room_name');
    var fdMail = document.getElementById('invite');
    var submit_btn = document.getElementById('btnSubmit');
    var roomRef = firebase.database().ref('roomList');
    submit_btn.addEventListener('click', function () {
        console.log(roomName);
        if (roomName.value !== "" && fdMail.value!=="") {
            roomRef.push({room_name:roomName.value, email_1:user_email, email_2:fdMail.value});
            roomName.value = "";
            fdMail.value = "";
            alert("create success");
        }
    });

    var NowUsing = firebase.database().ref('/UserUsing/');
    var EnterRoom = document.getElementById('toRoom');
    var EnterBtn = document.getElementById('enter');
    var flag = 0;
    EnterBtn.addEventListener('click', function(){
        roomRef.once('value').then(function(snapshot){
            for (var i in snapshot.val())
            {
                if (snapshot.val()[i].room_name === EnterRoom.value &&((snapshot.val()[i].email_1 === user_email) || (snapshot.val()[i].email_2 === user_email)))
                {
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) alert("Room not Found");
            else{
                NowUsing.push({User: user_id, UsingRoom: EnterRoom.value});
                window.location="privateRoom.html"
            }
        })
    });

    var total_list = [];

    roomRef.once('value')
        .then(function (snapshot) {
            console.log(snapshot);
            for (var i in snapshot.val()) {
                if (snapshot.val()[i].email_1 === user_email || snapshot.val()[i].email_2 ===user_email)
                {
                    total_list +=
                    "<div id='temp' class='roomBtn'>" + snapshot.val()[i].room_name +"</div>";
                }
                document.getElementById('rooms').innerHTML = total_list;
            }

            roomRef.on('value', function (snapshot) {
                total_list = [];
                document.getElementById('rooms').innerHTML = "";
                for (var i in snapshot.val()) {
                    if (snapshot.val()[i].email_1 === user_email || snapshot.val()[i].email_2 ===user_email)
                    {
                        total_list +=
                        "<div id='temp' class='roomBtn'>" + snapshot.val()[i].room_name +"</div>";
                    }
                    document.getElementById('rooms').innerHTML = total_list;
                    $("#temp").attr("id",snapshot.val()[i].room_name);
                }
            })
        }).catch(e => console.log(e.message));

        
}

window.onload = function () {
    init();
};