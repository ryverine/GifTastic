

	// Bonus Goals

	// #1
	// Ensure your app is fully mobile responsive.

	// #2
	// Allow users to request additional gifs to be added to the page.
	// Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

	// #3
	// List additional metadata (title, tags, etc) for each gif in a clean and readable format.

	// #4
	// Include a 1-click download button for each gif, this should work across device types.
	// https://www.w3schools.com/howto/howto_css_download_button.asp

	// #4
	// Integrate this search with additional APIs such as OMDB, or Bands in Town. 
	// Be creative and build something you are proud to showcase in your portfolio
	// 	PUBLIC API
	// 	https://github.com/toddmotto/public-apis


	// TENOR API
	// https://tenor.com/gifapi/documentation

	// OPEN GIF API
	// https://www.programmableweb.com/api/open-gif


$(document).ready(function() 
{
	var favCount = 0;

	var defalutTopics = ["cat", "dog", "bird"];

	var topics = [];

	loadTopics();

	var favorites = [];

	loadFavorites();


	function loadFavorites()
	{
		console.log("loadFavorites()");

		if (JSON.parse(localStorage.getItem('userFavorites')) != null)
		{
			favorites = JSON.parse(localStorage.getItem('userFavorites'));

			updateFavoritesArea(favorites);
		}
	}


	function updateButtonArea(theArray)
	{
		console.log("updateButtonArea("+theArray+")");

		var buttonArea = $("#buttonArea");
		buttonArea.empty();

		for(var i = 0; i < theArray.length; i++)
		{
			var newButton = $("<button>");
			newButton.text(theArray[i].toUpperCase());
			newButton.attr("class", "btn btn-warning btn-query");
			newButton.attr("data-btnText", theArray[i]);
			buttonArea.prepend(newButton);
		}
	}


	function updateFavoritesArea(theArray)
	{
		console.log("updateFavoritesArea("+theArray+")");

		var favoritesArea = $("#userFavorites");
		favoritesArea.empty();

		if(theArray.length > -1)
		{
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
				removeButton.attr("class", "btn btn-danger favRemove");
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


	function loadTopics()
	{
		console.log("loadTopics()");

		if (JSON.parse(localStorage.getItem("userQuickSelect")) != null)
		{
			var userQuickSelect = JSON.parse(localStorage.getItem("userQuickSelect"));

			for(var i = 0; i < userQuickSelect.length; i++)
			{
				topics.push(userQuickSelect[i]);
			}
		}
		else
		{
			for(var i = 0; i < defalutTopics.length; i++)
			{
				topics.push(defalutTopics[i]);
			}

			localStorage.removeItem("userQuickSelect");
			localStorage.setItem("userQuickSelect", JSON.stringify(topics));
		}

		updateButtonArea(topics);
	}


	$("#btn-add").on("click", function() 
	{
		// prevent form from submitting
		event.preventDefault();

		console.log("ADD QUICK SELECT BUTTON CLICKED");

		var newBtn = $("#newButtonText").val().trim().toUpperCase();

		if (newBtn != "")
		{
			topics.push(newBtn);

			$("#newButtonText").val("");

			updateButtonArea(topics);

			localStorage.removeItem("userQuickSelect");
			localStorage.setItem("userQuickSelect", JSON.stringify(topics));
		}
	});


	$("#btn-reset").on("click", function() 
	{
		// prevent form from submitting
		event.preventDefault();

		console.log("RESET QUICK SELECT BUTTON CLICKED");

		if (topics.length > 0)
		{
			topics = [];

			for(var i = 0; i < defalutTopics.length; i++)
			{
				topics.push(defalutTopics[i]);
			}

			updateButtonArea(topics);

			localStorage.removeItem("userQuickSelect");
			localStorage.setItem("userQuickSelect", JSON.stringify(topics));
		}
	});

	
	$("#btn-fav-clear").on("click", function() 
	{
		console.log("CLEAR FAVORITES BUTTON CLICKED");

		localStorage.removeItem("userFavorites");	

		favorites = [];
		$("#userFavorites").empty();

		favCount = 0;
	});


	$("#btn-gif-clear").on("click", function()
	{
		console.log("CLEAR GIFS BUTTON CLICKED");

		$("#searchResults").empty();
	});


	$(document).on("click", "button.btn-query", function() 
	{
		console.log($(this).text().toUpperCase() + " BUTTON CLICKED");

		var apiKey = "AYXRNvMf24hqgRG3UzDrrOKtm5HQv0Sj";
		var numOfGif = 10;
		var searchText = $(this).attr("data-btnText");

		for (var j = 0; j < searchText.length; j++)
		{
			if(searchText.charAt(j) === " ")
			{
				searchText.charAt(j) = "+";
			}
		}

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchText + "&api_key=" + apiKey + "&limit=" + numOfGif;

		console.log("queryURL = " + queryURL);

		var gifType = $(this).text();

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
				//newImage.attr("data-img-type", gifType);
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


	$(document).on("click", "button.favCheck", function() 
	{
		console.log("FAVORITE BUTTON CLICKED");

		var favButton = $(this);
		var stillImg = favButton.attr("data-still");
		var gifImg = favButton.attr("data-animate");

		var localContent = gifImg.split(".gif");

		var alreadyInFavorites = false;
		
		if (favorites.length > -1)
		{
			for(var i = 0; i < favorites.length; i++)
			{
				if( favorites[0] === localContent[0])
				{
					alreadyInFavorites = true;
					break;
				}
			}
		}

		if(!alreadyInFavorites)
		{
			favorites.push(localContent[0]);

			localStorage.removeItem("userFavorites");	
			localStorage.setItem("userFavorites", JSON.stringify(favorites));

			var favImgDiv = $("<div>");
			favImgDiv.attr("id", "fav-div-" + favCount);

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

		var remButton = $(this);
		var remButton_data_animate = remButton.attr("data-animate").split(".gif");
		var imgToRemove = remButton_data_animate[0];

		var indexToRemove = favorites.indexOf(imgToRemove);
		favorites.splice(indexToRemove, 1);

		localStorage.removeItem("userFavorites");	
		localStorage.setItem("userFavorites", JSON.stringify(favorites));
		updateFavoritesArea(favorites);
		favCount--;
	});


	$(document).on("click", "img.gif", function() 
	{
		// console.log( $(this).attr("data-img-type").toUpperCase() + " GIF CLICKED");

		console.log("GIF CLICKED");

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
