function initApp() {
    // Login with Email/Password
    var txtEmail = document.getElementById('exampleInputEmail1');
    var txtPassword = document.getElementById('exampleInputPassword1');
    var btnLogin = document.getElementById('btnsignIn');
    var btnGoogle = document.getElementById('btngoogle');

    btnLogin.addEventListener('click', function () {
        
        firebase.auth().signInWithEmailAndPassword(txtEmail.value, txtPassword.value).then(function (result) {
            alert("Login success!");
            window.location.href = "loby.html";            
        }).catch(function (error) {
            // Handle Errors here.
            alert(error.message);
            window.location ="index.html";
        });
        
    });

    btnGoogle.addEventListener('click', function () {
        /// TODO 3: Add google login button event
        ///         1. Use popup function to login google
        ///         2. Back to index.html when login success
        ///         3. Show error message by "create_alert"
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            window.location.href = "loby.html";
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredentialtype that was used.
            var credential = error.credential;
        });
    });
}

window.onload = function () {
    initApp();
};