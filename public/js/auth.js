$("document").ready(
    $.ajax({
        url:"myID",
        method:"GET"
    }).then(function(response){
        $("#userID").text(response.id);
    })
)