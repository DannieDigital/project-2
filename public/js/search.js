var searchForm = $("#searchForm");
var searchTerm = $("#searchTerm");
var hashtagArr = [];
var searchHashtag = localStorage.getItem("search");

renderPosts();

// Get all the hashtags in the database and save to an array 

searchForm.on("submit", function(event){
  event.preventDefault(event);
  localStorage.setItem("search", searchTerm.val().trim());
  window.location.replace(`/search.html`);
});

function renderPosts(){
    allPosts.empty();

    $.get(`/api/hashtags`, function(data){
        console.log(data);
      
        data.forEach(hashtag => {
          hashtagArr.push({
            id: hashtag.id,
            hashtag: hashtag.tagname
      
          });
        })
      }).then(function(){

        var hashtagId;

        hashtagArr.forEach(hashtag => {
            // console.log(`Post.hashtag: ${post.hashtag} Hashtag.hashtag: ${hashtag.hashtag}`)
            if (searchHashtag == hashtag.hashtag){
                hashtagId = hashtag.id;
              // console.log("they are equal!");
      
            }
      
          })
    
      $.get("/api/hashtags/"+hashtagId, function(data){
          // console.log(data);
            var posts = data.Posts;
  
            posts.forEach(post => {
  
              
            
              var postRow = $(`<div class = "row post">`);
              var profilePic = $(`<div class = "col-1"><img src="assets/1x1.png" width="50" height="50"></div>`);
              var postDiv = $(`<div class = "col-11">`);
              var postCard = $(`<div class="card">`);
              var popup = $(`<div class="card-body popup">`);
              var cardText = $(`<p class="card-text">${post.text}</p>`);
              var hashtag = $(`<p class="card-text"><small class="text-muted">${post.tagname||""}</small></p>`);
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
          });
        });
  }