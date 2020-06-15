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
                var title = $("<h3>").addClass("card-title").text(response.firstName + response.lastName);
                var image = $("<img>").addClass("img-fluid").setAttribute("src", response.url);
                var username = $("<h4>").addClass("card").text(response.username);
          

                $("#user-box").append(card);
                card.append(image,title,username)

            }
        })
    }
    getUser();
})
