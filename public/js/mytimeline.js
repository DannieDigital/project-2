var postForm = $("#postForm");
var newPost = $("#newpost");
var file = $("#file");
var hashtag = $("#hashtag");
var postAlert = $("#postAlert");

var userId = localStorage.getItem('userId');
// var stockPhoto = "assets/profile.png";
var allPosts = $("#posts");
// var dataImage = localStorage.getItem('avatar');
var hashtagArr = [];
var fileLoc = $("#fileLoc");
var searchForm = $("#searchForm");
var searchTerm = $("#searchTerm");

renderPosts();

// Get all the hashtags in the database and save to an array 

searchForm.on("submit", function(event){
  event.preventDefault(event);
  localStorage.setItem("search", searchTerm.val().trim());
  window.location.replace(`/search.html`);
})

var user = localStorage.getItem('userId');
var stockPhoto = "assets/profile.png";
var allPosts = $("#posts");

renderPosts();


postForm.on("submit", function(event){

  event.preventDefault(event);

  $.get(`/api/hashtags`, function(data){
    console.log(data);
  
    data.forEach(hashtag => {
      hashtagArr.push({
        id: hashtag.id,
        hashtag: hashtag.tagname
  
      });
    })
  }).then(function(){
    if (newPost.val().trim() == "" ){
      postAlert.removeAttr("hidden")
      postAlert.text("Please fill out Post field")
      return;
    }

    imgData = getBase64Image(blah);
    var image;

    if (file[0].files[0]){
      image = file[0].files[0].name;
      localStorage.setItem(`${image}`, imgData);
    }else if (!file[0].files[0]){
      image = fileLoc.val().trim()
    }
    
    if(!image){
      image = 0;
    }

    // Get form data 
    var post = {

      UserId: userId,
      text: newPost.val().trim(),
      HashtagId: null,
      hashtag: hashtag.val().trim(),
      image: image,
        text: newPost.val().trim(),
        image: file[0].files[0],
 
    }

    newPost.val("");
    hashtag.val("");
    file.val("");
    fileLoc.val("");
    $("#blah") .attr('src', "assets/1x1.png");

    hashtagArr.forEach(hashtag => {
      // console.log(`Post.hashtag: ${post.hashtag} Hashtag.hashtag: ${hashtag.hashtag}`)
      if (post.hashtag == hashtag.hashtag){
        post.HashtagId = hashtag.id;
        // console.log("they are equal!");

      }

    });

    // console.log(hashtagArr);
    // console.log(post.HashtagId)

    if(!post.HashtagId){
      $.post("/api/hashtags", {tagname: post.hashtag}, function(data){

        post.HashtagId = data.id;
      })
        .then(function() {
          $.post("/api/posts", post)
            .then(function() {
              renderPosts();
            })
            .catch(function(err) {
              console.log(err);
            });
         })
        .catch(function(err) {
          console.log(err);
        });
    }else{

    $.post("/api/posts", post)
        .then(function() {
          renderPosts();
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    });
    
    
});

function makePost(){

  $.get(`/api/users/${userId}`, function(data){
    console.log(data);

    var image = localStorage.getItem(`${data.avatar}`);
    var photo;

    if (image){
      photo = "data:image/png;base64," + image;
    }else{
      photo = data.avatar;
    }

    var rowPost = $(`<div class = "row post"></div>`)
    var profilePic = $(`<div class = "col-1"><img src="${photo}" width="50" height="50"></div>`)
    var newPostBttn = $(`<div class = "col-7 mx-auto">
    <div class="card">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newPost">New Post</button>
        
      </div>`);

      rowPost.append(profilePic);
      rowPost.append(newPostBttn);
      allPosts.append(rowPost);
    });


  

}

function getImage(photoData){
  var image = localStorage.getItem(`${photoData}`);
  var photo;

  if (image){
    photo = "data:image/png;base64," + image;
  }else{
    photo = photoData;
  }

  return photo;
}
function renderPosts(){
  allPosts.empty();
  makePost();
// On the back end the orm would return the posts of all the users "user" follows. Thats why we need the user in url. This route could be confused with the one to return all posts from a certain user. Maybe we could name that one "/api/posts/user"
    $.get("/api/posts", function(data){
        // console.log(data);
        var tagname;


        hashtagArr.forEach(hashtag => {
          if (data.HashtagId == hashtag.id){
            tagname = hashtag.hashtag; 
          }  
        }); 

        console.log(tagname)

          data.forEach(post => {

            
          
            var postRow = $(`<div class = "row post">`);
            var profilePic = $(`<div class = "col-1"><img src="${getImage(post.User.avatar)}" width="50" height="50"></div>`);
            var postDiv = $(`<div class = "col-11">`);
            var postCard = $(`<div class="card">`);
            var popup = $(`<div class="card-body popup">`);
            var cardText = $(`<p class="card-text">${post.text}</p>`);
            var hashtag = $(`<p class="card-text"><small class="text-muted">${tagname}</small></p>`);
            var postImage = $(`<img src="${getImage(post.image)}" class="card-img-top" alt="..."width="300" height="200">`);
            var footer = $(`<div class="card-footer text-muted mx-auto">
            ${moment(post.updatedAt).fromNow()}</div>`);

            postRow.append(profilePic);
            popup.append(cardText);
            popup.append(hashtag);

            if (post.image != 0){
              popup.append(postImage);
            }

            popup.append(footer);

            postCard.append(popup);
            postDiv.append(postCard);
            postRow.append(postDiv);
            allPosts.append(postRow);
          });
        console.log(data);
        data.array.forEach(post => {
          
          var postRow = $(`<div class = "row post">`);
          var profilePic = $(`<div class = "col-1"><img src="${post.User.avatar || stockPhoto}" width="50" height="50"></div>`);
          var postDiv = $(`<div class = "col-11">`);
          var postCard = $(`<div class="card">`);
          var popup = $(`<div class="card-body popup">`);
          var cardText = $(`<p class="card-text">${post.text}</p>`);
          var hashtag = $(`<p class="card-text"><small class="text-muted">${post.hashtag || " "}</small></p>`);
          var postImage = $(`<img src="${post.image}" class="card-img-top" alt="..."width="300" height="200">`);
          var footer = $(`<div class="card-footer text-muted mx-auto">
          ${moment(post.updatedAt).fromNow()}</div>`);

          postRow.append(profilePic);
          popup.append(cardText);
          popup.append(hashtag);


    <div class = "col-11">
    <div class="card">
        <div class="card-body popup">
          
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">#express #hw</small></p>
        </div>
        <img src="placeholder.png" class="card-img-top" alt="..."width="300" height="200">

        <div class="card-footer text-muted mx-auto">
          2 days ago
        </div>
      </div>
      </div>
  </div>

          if (post.image){
              popup.append(postImage);
          }

          popup.append(footer);

          postCard.append(popup);
          postDiv.append(postCard);
          postRow.append(postDiv);
          allPosts.append(postRow);

        });
   
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {

      $('#blah')
        .attr('src', e.target.result)
        
    };
    reader.readAsDataURL(input.files[0] );
  }
}

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

var localStorageSpace = function(){
  var data = '';

  console.log('Current local storage: ');

  for(var key in window.localStorage){

      if(window.localStorage.hasOwnProperty(key)){
          data += window.localStorage[key];
          console.log( key + " = " + ((window.localStorage[key].length * 16)/(8 * 1024)).toFixed(2) + ' KB' );
      }

  }

  console.log(data ? '\n' + 'Total space used: ' + ((data.length * 16)/(8 * 1024)).toFixed(2) + ' KB' : 'Empty (0 KB)');
  console.log(data ? 'Approx. space remaining: ' + (5120 - ((data.length * 16)/(8 * 1024)).toFixed(2)) + ' KB' : '5 MB');
};

localStorageSpace();
