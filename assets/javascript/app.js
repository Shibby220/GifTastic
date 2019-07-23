var topics = ["cat", "dog", "bird", "turtle", "duck", "lion", "tiger", "bear"];

renderButtons();

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var newButton = $("<button>");
      newButton.addClass("button");
      newButton.attr("data-animal", topics[i]);
      newButton.text(topics[i]);
      $("#buttons-view").append(newButton);
    }
  }

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("#animal-input").val().trim();
    topics.push(newAnimal);
    renderButtons();
  });

$(document).on("click", ".button", function(){
  var animal = $(this).text();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=CJz7vFn0nZkzlOxred7ZRQS58pqHtOhe&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
     var animalDiv = $("<div>");
     var p = $("<p>").text("Rating: " + results[i].rating);
     var animalImage = $("<img>");
     animalImage.attr("src", results[i].images.fixed_height_still.url);
     animalImage.attr("data-state", "still");
     animalImage.attr("data-still", results[i].images.fixed_height_still.url);
     animalImage.attr("data-animate", results[i].images.fixed_height.url);
     animalImage.addClass("gif");
     animalDiv.append(p);
     animalDiv.append(animalImage);
     $("#animals-view").prepend(animalDiv);
    }
  });
});

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});