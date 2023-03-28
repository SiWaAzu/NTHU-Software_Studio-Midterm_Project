var user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
  console.log(user.email);
} else {
  // No user is signed in.
  alert("error");
}

/*var total_post = [];
    var first_count = 0;
    var second_count = 0;

    postsRef.once('value')
        .then(function (snapshot) {
            for (var i in snapshot.val()) {
                total_post +=
                    "<div class='talk'><p><strong>" + snapshot.val()[i].email + "</strong>" + snapshot.val()[i].message + "</p> </div>";
                document.getElementById('').innerHTML = total_post;
            }
        });*/