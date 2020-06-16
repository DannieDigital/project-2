var id = localStorage.getItem('userId');
var searchForm = $("#searchForm");
var searchTerm = $("#searchTerm");

renderPosts();

searchForm.on("submit", function(event){
  event.preventDefault(event);
  localStorage.setItem("search", searchTerm.val().trim());
  window.location.replace(`/search.html`);
})

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

$(document).ready(function(){
    console.log("Hi")


    function getUser(id) {
        $.ajax({
            type: "GET",
            url: `/api/users/${id}`,
            dataType: "json",
            success: function(response) {
                $("#user-box").empty();
               
 console.log(response)
                var card = $("<div>").addClass("card");
                var title = $("<h3>").addClass("card-title").text(response.firstname + response.lastname);
                var image = $(`<img class = "img-fluid" src = ${getImage(response.avatar)}>`);
                var username = $("<h4>").addClass("card").text(response.username);
          

                $("#user-box").append(card);
                card.append(image,title,username)
                $("#user").append(card);
            }
        })
    }
    getUser(id);
})
