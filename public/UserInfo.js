

function init() {
    console.log("user");
    firebase.auth().onAuthStateChanged(function (user) {
        // Check user login
        if (user) {
            var user_name = user.displayName;
            var user_mail = user.email;
            document.getElementById('user_name').innerHTML = "<h3>暱稱: "+user_name+"</h3>";
            var name_txt = document.getElementById('new_name');
            var submit_btn = document.getElementById('btnSubmit');
            submit_btn.addEventListener('click', function () {
                console.log("0 0 ");
                if (name_txt.value !== "") {
                    user.updateProfile({
                        displayName: name_txt.value,
                      }).then(function() {
                       alert("change success!");
                       window.location.href = "UserInfo.html";
                      }).catch(function(error) {
                        alert(error.message);
                      });
                }
            });
            
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
}  

    


window.onload = function () {
    init();
};