var name = "giftastic"
console.log(name);

//event listerner for all button elements
$("button").on("click", function () {
  var choice = $(this).attr("data-choice");
});

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + choice + "&api_key=hkxKxvHGZkDCWiZCAbGXUxBA5SR2U766";


//ajax request
$.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function (response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var choiceDiv = $("<div>");
    }
    var p = $("<p>").text(`Rating: ${results[i].rating}`);
    var choiceImage = $("<img>");
    choiceImage.attr("src", results[i].images.fixed_height.url);
    choiceDiv.append(p);
    choiceDiv.append(choiceImage);
    $(".gifBox").prepend(choiceDiv);

  });