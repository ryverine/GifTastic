// file:///F:/bootC/giftastic_project/index.html


$(document).ready(function() 
{
	// prevent form from submitting
	// event.preventDefault();

	// data persistance
	// localStorage.clear()
	// name is the key, username is value of key
	// localStorage.setItem("name", username);
	// localStorage.getItem("name")

	// localStorage.setItem("storeData", JSON.stringify(storeData));

	// JSON.parse(localStorage.getItem('user'));

	// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. 
	// Save it to a variable called topics.
	// We chose animals for our theme, but you can make a list to your own liking.

	var imgCount = 0;
	var favCount = 0;

	var topics = ["cat", "dog", "tiger"];

	updateButtonArea(topics);

	var favorites = [];


	if (JSON.parse(localStorage.getItem('userFavorites')) != null)
	{
		favorites = JSON.parse(localStorage.getItem('userFavorites'));



		updateFavoritesArea(favorites);
	}

	//updateFavoritesArea(favorites);

	// Your app should take the topics in this array and create buttons in your HTML.
	// Try using a loop that appends a button for each string in the array.

	$("#btn-add").on("click", function() 
	{
		event.preventDefault();

		var newBtn = $("#newButtonText").val();

		if (newBtn != "")
		{
			topics.push(newBtn);

			$("#newButtonText").val("");

			updateButtonArea(topics);
		}
	});

	function updateButtonArea(theArray)
	{
		var buttonArea = $("#buttonArea");
		buttonArea.empty();

		for(var i = 0; i < theArray.length; i++)
		{
			var newButton = $("<button>");
			newButton.text(theArray[i]);
			newButton.attr("class", "btn btn-warning btn-query");
			newButton.attr("data-btnText", theArray[i]);

			buttonArea.prepend(newButton);
		}
	}

	function updateFavoritesArea(theArray)
	{
		if(theArray.length > -1)
		{
			var favoritesArea = $("#userFavorites");
			favoritesArea.empty();

		// data-still = https://media3.giphy.com/media/103JnbaqvpBFGE/200_s.gif
		// data-animate = https://media3.giphy.com/media/103JnbaqvpBFGE/200.gif

			for(var i = 0; i < theArray.length; i++)
			{
				var favImgDiv = $("<div>");
				favImgDiv.attr("id", "fav-div-" + i)

				var newImage = $("<img>");
				newImage.attr("src", theArray[i] + "_s.gif");
				newImage.attr("data-still", theArray[i] + "_s.gif");
				newImage.attr("data-animate", theArray[i] + ".gif");
				newImage.attr("data-state", "still");
				newImage.attr("class", "gif");

				var removeButton = $("<button>")
				removeButton.attr("id", "btn-rmv-" + i)
				removeButton.attr("class", "btn btn-danger favCheck");
				removeButton.attr("name", theArray[i] + "_s.gif");
				// removeButton.attr("value", favButton.val());
				removeButton.attr("data-still", theArray[i] + "_s.gif");
				removeButton.attr("data-animate", theArray[i] + ".gif");
				removeButton.text("Remove");

				favImgDiv.append(newImage);
				favImgDiv.append("<br>");
				favImgDiv.append(removeButton);

				favoritesArea.prepend(favImgDiv);
			}

			favCount = theArray.length;
		}
	}


	// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

	// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

	// Under every gif, display its rating (PG, G, so on).
	// This data is provided by the GIPHY API.
	// Only once you get images displaying with button presses should you move on to the next step.

	// Add a form to your page takes the value from a user input box and adds it into your topics array. 
	// Then make a function call that takes each topic in the array remakes the buttons on the page.

	// Deploy your assignment to Github Pages.



	// Bonus Goals

	// Ensure your app is fully mobile responsive.

	// Allow users to request additional gifs to be added to the page.
	// Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

	// List additional metadata (title, tags, etc) for each gif in a clean and readable format.

	// Include a 1-click download button for each gif, this should work across device types.

	// Integrate this search with additional APIs such as OMDB, or Bands in Town. 
	// Be creative and build something you are proud to showcase in your portfolio

	// PUBLIC API
	// https://github.com/toddmotto/public-apis


//https://www.taniarascia.com/how-to-use-local-storage-with-javascript/	
	$("#btn-fav-clear").on("click", function() {

		localStorage.clear();
		favorites = [];
		$("#userFavorites").empty();
				//console.log(	"CLEAR LOCAL STORAGE" + "\n" + JSON.parse(localStorage.getItem('userFavorites')));
		//localStorage.setItem("userFavorites", JSON.stringify(favorites));

		favCount = 0;
	});


	$("#btn-gif-clear").on("click", function()
	{
		$("#searchResults").empty();
	});


	$(document).on("click", "button.btn-query", function() 
	{
		var apiKey = "AYXRNvMf24hqgRG3UzDrrOKtm5HQv0Sj";
		var numOfGif = 10;
		var searchText = $(this).attr("data-btnText");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchText + "&api_key=" + apiKey + "&limit=" + numOfGif;

		var gifType =  $(this).text();

		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response){

			console.log(response);

			var results = response.data;

			for (var i = 0; i < results.length; i++) 
			{
				var imgDiv = $("<div>");

				var rating = results[i].rating;

				var ratingParagraph = $("<p>").text("Rating: " + rating);
				ratingParagraph.attr("class", "rating");

				var stillImage = results[i].images.fixed_height_still.url;
				var animatedImage = results[i].images.fixed_height.url;

				var newImage = $("<img>");
				newImage.attr("src", stillImage);
				newImage.attr("id", "img-" + i)
				newImage.attr("data-still", stillImage);
				newImage.attr("data-animate", animatedImage);
				newImage.attr("data-state", "still");
				newImage.attr("data-img-type", gifType);
				newImage.attr("class", "gif");

				var favCheck = $("<button>");
				favCheck.attr("id", "btn-fav-" + i)
				favCheck.attr("class", "btn btn-primary favCheck");
				favCheck.attr("name", stillImage);
				favCheck.attr("value", gifType);
				favCheck.attr("data-still", stillImage);
				favCheck.attr("data-animate", animatedImage);
				favCheck.text("Favorite");

				ratingParagraph.prepend(favCheck);

				imgDiv.prepend(ratingParagraph);

				imgDiv.prepend(newImage);

				$("#searchResults").prepend(imgDiv);
			}

		});
	});

	// Allow users to add their favorite gifs to a favorites section.
	// This should persist even when they select or add a new topic.
	// If you are looking for a major challenge, look into making this section persist even when the page is reloaded (via localStorage or cookies).

	$(document).on("click", "button.favCheck", function() 
	{

		var favButton = $(this);

		var stillImg = favButton.attr("data-still");
		var gifImg = favButton.attr("data-animate");

		var localContent = gifImg.split(".gif");

		// data-still = https://media3.giphy.com/media/103JnbaqvpBFGE/200_s.gif
		// data-animate = https://media3.giphy.com/media/103JnbaqvpBFGE/200.gif

		//console.log("favButton.val() = " + favButton.val());

		// check to see if image is in favorites
		var alreadyInFavorites = false;
		
		if (favorites.length > -1)
		{
			for(var i = 0; i < favorites.length; i++)
			{
				//var tester = currentFavorites[i].split(".gif");

				if( favorites[0] === localContent[0])
				{
					alreadyInFavorites = true;
					break;
				}
			}
		}

		if(!alreadyInFavorites)
		{
			// favButton.text("Remove");
			// console.log("CHECKED");

			// ADD TO FAVORITES
			
			// console.log("localContent = " + localContent[0]);
			favorites.push(localContent[0]);

			localStorage.clear();
			localStorage.setItem("userFavorites", JSON.stringify(favorites));
			// console.log(	"LOCAL STORAGE" + "\n" + JSON.parse(localStorage.getItem('userFavorites')))

			var favImgDiv = $("<div>");
			favImgDiv.attr("id", "fav-div-" + favCount);
			// favImgDiv.attr("id", "???");

			var newImage = $("<img>");
			newImage.attr("src", stillImg)
			newImage.attr("data-still", stillImg);
			newImage.attr("data-animate", gifImg);
			newImage.attr("data-state", "still");
			//newImage.attr("data-img-type", favButton.val());
			newImage.attr("class", "gif");

			var removeButton = $("<button>")
			removeButton.attr("id", "btn-rmv-" + favCount)
			removeButton.attr("class", "btn btn-danger favRemove");
			removeButton.attr("data-still", stillImg);
			removeButton.attr("data-animate", gifImg);
			removeButton.text("Remove");

			favImgDiv.append(newImage);
			favImgDiv.append("<br>");
			favImgDiv.append(removeButton);

			$("#userFavorites").prepend(favImgDiv);

			favCount++;
		}

	});


	$(document).on("click", "button.favRemove", function() 
	{
		console.log("REMOVE BUTTON CLICKED");
		console.log("favorites = " + "\n" + favorites);
		var remButton = $(this);

		var stillImg = remButton.attr("data-still");
		var gifImg = remButton.attr("data-animate");

		var localContent = gifImg.split(".gif");

		console.log("localContent = " + localContent[0]);

		// data-still = https://media3.giphy.com/media/103JnbaqvpBFGE/200_s.gif
		// data-animate = https://media3.giphy.com/media/103JnbaqvpBFGE/200.gif

		// console.log("UNCHECKED");
		// REMOVE FROM FAVORITES

		//var idArray = favButton.attr("id").split("-");
		//var itemToRemove = Number.parseInt(idArray[2]);

		var itemToRemove = favorites.indexOf(localContent[0]);

		console.log("itemToRemove = " + itemToRemove);

		//favorites.splice(itemToRemove, 1);

		//localStorage.clear();
		//localStorage.setItem("userFavorites", JSON.stringify(favorites));

		//$("#favoritesArea").empty();
		//updateFavoritesArea(favorites);

		//favCount--;

	});

	// https://stackoverflow.com/questions/16893043/jquery-click-event-not-working-after-adding-class
	// Since the class is added dynamically, you need to use event delegation to register the event handler
	$(document).on("click", "img.gif", function() 
	{
		var state = $(this).attr("data-state");
		
		if (state === 'still')
		{
	    	$(this).attr("src", $(this).attr("data-animate"));
	   		$(this).attr("data-state", 'animate');
    	}
    	else if (state === 'animate')
    	{
        	$(this).attr("src", $(this).attr("data-still"));
        	$(this).attr("data-state", 'still');
    	}
    	else
    	{
        	console.log("do nothing");
    	}

    });

});
