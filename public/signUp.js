function initApp() {
    // Login with Email/Password
    var txtEmail = document.getElementById('exampleInputEmail1');
    var txtPassword = document.getElementById('exampleInputPassword1');
    var btnGoogle = document.getElementById('btngoogle');
    var btnSignUp = document.getElementById('btnsignUp');

    btnGoogle.addEventListener('click', function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            window.location.href = "index.html";
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredentialtype that was used.
            var credential = error.credential;
            alert(error.message);
        });

    });

    btnSignUp.addEventListener('click', function() {
        console.log("yes");
        firebase.auth().createUserWithEmailAndPassword(txtEmail.value,txtPassword.value).then(function(result){
            alert("!Create Successfully!");
            window.location.href = "index.html";
            txtEmail.value = "";
            txtPassword.value = "";
            
        }
        ).catch(function(error) { 
            // Handle Errors here. 
            var errorCode = error.code; 
            var errorMessage = error.message;
            txtEmail.value = "";
            txtPassword.value = "";
            console.log(error.message);
            alert(error.message); 

        });
    });
}

window.onload = function() {
    initApp();
};