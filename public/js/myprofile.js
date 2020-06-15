var user = localStorage.getItem('user')

$(document).ready(function(){
    console.log(("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"))


    function getUser() {
        $.ajax({
            type: "GET",
            url: "to the backend",
            dataType: "json",
            success: function(response) {
                $(".user-box").empty();

                var card = $("<div>").addClass("card");
                var title = $("<h3>").addClass("card-title").text("Mary " + "Smith");
                var image = $("<img>").addClass("img-fluid").setAttribute("src", response.url)
          

                $(".user-box").append(card);
                card.append(title,image)

            }
        })
    }
    getUser();
})