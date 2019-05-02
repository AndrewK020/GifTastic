var animals = [
    "lion",
    "tiger",
    "bear",
    "dog",
    "cat",
    "mouse",
    "fish",
    "kangaroo",
    "aligator",
    "cheeta",
    "horse",
    "elephant",
    "zebra",
    "rabbit",
    "deer",
    "cow",
    "chicken",
    "lamb",
    "sheep",
    "wolf",
];

$(document).ready(function() {

   createBtns();

    $(document).on("click", ".btn-success", function() {
        getAnimal($(this).text());
    });

    $(document).on("click", ".animal", function(e) {
        e.preventDefault();

        var tempGif = $(this).data("second-gif");
        var currentGif = $(this).attr("src");

        $(this).data("second-gif", currentGif);
        $(this).attr("src", tempGif);
    });

    $("#submit").on("click", function(){
        var topic = $("#input").val().trim();
        animals.push(topic);
        createBtns();
    });

});

function createBtns() {
    $("#btns").empty();
    animals.forEach(function(animal){
        var btn = $("<button>");

        $(btn).text(animal);
        $(btn).attr("class","btn btn-success")
        $("#btns").append(btn);
    });
}

function getAnimal(animal) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal+ "&api_key=kD0JZ5vHSnKqOCp0wIOPzX96SBYn8tcu&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var animalArray = response.data;
        addGifs(animalArray);
      });
}

function addGifs(array) {
    $("#gifs").empty();
    array.forEach(function(object){
        var container = $("<div>").attr("class","container");

        var rating = $("<p>").text("Rating: " + object.rating);
        $(container).append(rating);

        var image = $("<img>").attr("class", "animal");
        $(image).attr("src", object.images.original_still.url);
        $(image).data("second-gif", object.images.original.url);
        $(container).append(image);

        $("#gifs").append(container);
    });
}
