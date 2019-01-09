var name = "giftastic"
console.log(name);

// //initial array of gifs
var gifs = ["Ironman", "Hulk", "Thor", "Black Widow", "Ant Man", "Groot"]

function displayGif() {



  //event listerner for all button elements
  $("button").on("click", function () {
    var choice = $(this).attr("data-choice");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + choice + "&api_key=hkxKxvHGZkDCWiZCAbGXUxBA5SR2U766";

    // Creating an AJAX call for the specific Gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        var results = response.data;
        console.log("hi");
        for (var i = 0; i < results.length; i++) {
          var choiceDiv = $("<div>");
          console.log(results);
          var rating = results[i].rating
          var p = $("<p>").text("Rating: " + rating);

          var choiceImage = $("<img>");


          choiceImage.attr("src", results[i].images.fixed_height.url);

          choiceDiv.append(p);

          choiceDiv.append(choiceImage);


          //attempt to add attributest to turn on and off to animate and still gifs on page with click
          var animateImg = result[i].images.fixed_height.url;
          var stillImg = results[i].images.fixed_height_still.url;
          //
          //
          choiceImage.attr("src", stillImg);
          choiceImage.attr("data-still", stillImg);
          choiceImage.attr("data-animate", animateImg);
          choiceImage.attr("data-state", "still");
          choiceImage.addClass("gif-image");
          //


          $(".gifBox").prepend(choiceDiv);
        }
      });
  });
};

function animateGif() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

};



//generate button:
function renderButtons() {
  $("#button-view").empty();

  for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>");
    a.addClass("gif-button");
    a.attr("data-choice", gifs[i]);
    a.text(gifs[i]);
    $("#button-view").append(a);
  }
}

//function that handles events where a gif button is clicked
$("#add-gif").on("click", function (event) {
  event.preventDefault();

  var gif = $("#gif-input").val().trim();
  gifs.push(gif);
  renderButtons();
});

// Adding a click event listener to all elements with a class of gif-button
$(document).on("click", ".gif-button", displayGif);
$(document).on("click", ".gif-image", animateGif);
renderButtons();