var updateForm = $("#updateForm");
var updatedPost = $("#updatedPost");
var file = $("#file");
var hashtag = $("#hashtag");
var deletePost = $("#deletePost");
var user = localStorage.getItem('user');
var postAlert = $("#postAlert");

deletePost.on("click",function(){
    $.delete(`/api/posts/${user}`)
    .then(function() {
      renderPosts();
    })
    .catch(function(err) {
      console.log(err);
    });
});

updateForm.on("submit",function(event){
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

    $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: post
      })
        .then(function() {
            renderPosts();
        });
});

function renderPosts(){

  

}