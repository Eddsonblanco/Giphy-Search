
const keyword = ["cat", "dog",];

function displayGif() {

    let gif = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=QvgYWhmvAIfNCSfl7DrhV8JjwmOpsVpb";
        console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        const results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            const gifDiv = $(`<div class=${"imgGif"}>`);
            const rating = results[i].rating;
            const paragraph = $("<p>").text(`Rating: ${rating}`);
            const gifImage = $("<img class='gif-1'>");
            const spacing = $("<br>");
            gifImage.attr("src", results[i].images.fixed_height.url);
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            gifDiv.append(paragraph);
            gifDiv.append(spacing);
            gifDiv.append(gifImage);
            
            $("#gif").prepend(gifDiv);
        }
    });

}

// Function for displaying gif data
function renderButtons() {

    // Deleting the keyword prior to adding new keyword
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of keyword
    for (var i = 0; i < keyword.length; i++) {

        // Then dynamicaly generating buttons for each gif in the array
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("movie-btn btn btn-secondary m-2  ");
        // Adding a data-attribute
        a.attr("data-name", keyword[i]);
        // Providing the initial button text
        a.text(keyword[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
        
    }
}

// This function handles events where a button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gifphy = $("#gif-input").val().trim();

    // Adding movie from the textbox to our array
    keyword.push(gifphy);

    // Calling renderButtons which handles the processing of our array
    renderButtons();
    


});

// Adding a click event listener to all elements 
$(document).on("click", ".movie-btn", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();


$("#gif").on("click", ".gif-1", function() {
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "animate");
    }
    else {
     $(this).attr("src", $(this).attr("data-still"));
     $(this).attr("data-state", "still");
    }
   });