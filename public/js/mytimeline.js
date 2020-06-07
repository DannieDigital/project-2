var postForm = $("#postForm");
var newPost = $("#newpost");
var file = $("#file");
var hashtag = $("#hashtag");
var postAlert = $("#postAlert");
var user = localStorage.getItem('user')

console.log(moment().format())

postForm.on("submit", function(event){

    event.preventDefault(event);
    if (newPost.val().trim() == "" ){
        postAlert.removeAttr("hidden")
        postAlert.text("Please fill out Post field")
        return;
    }

    var post = {
        author: user,
        text: loginPassword.val().trim(),
        image: file[0].files[0],
        timestamp: moment().format()
    }

    $.post("/api/posts", post)
        .then(function() {
          renderPosts();
        })
        .catch(function(err) {
          console.log(err);
        });
});


// Would want to see what data looks like before finishing this function but for right now we know that it will make a call to the posts api
function renderPosts(){
// On the back end the orm would return the posts of all the users "user" follows. Thats why we need the user in url. This route could be confused with the one to return all posts from a certain user. Maybe we could name that one "/api/posts/user"
    $.get("/api/posts/user", function(data){
        console.log(data);
        });

}