var button_div = $("#button-holster");
var gif_div = $("#gif-holster");
var gif_buttons = ["funny animals", "not funny animals", "Venitian Snares", "perfect loops"];

function generate_gifs()
{
	var search_term = $(this).attr("data");
	var query_url = "api.giphy.com/v1/gifs/search?q=" + search_term + "&limit=10&api_key=mNG9esGV3v2gUw30rS2w2EoLioJ8eu98";

	$.ajax({
		url: query_url,
		method: "GET"
	})
	.then(function(response)
	{
		var select = response.data;

		for(var dis = 0; dis < select.length; dis++)
		{
			var new_div = $("<div>");
			var new_img = $("<img>");
			var new_p = $("<p>");

			new_p.text("Rating: " + select[dis].rating);
			new_img.attr("src", select[dis].images.fixed_height_still.url);

			new_div.append(new_img, new_p);

			gif_div.append(new_div);
		}
	});
}

function make_buttons()
{
	button_div.empty();

	for(var mov = 0; mov < gif_buttons.length; mov++)
	{
		var butt = $("<button>");
		butt.addClass("gif-search-term");
		butt.attr("data", gif_buttons[mov]);
		butt.text(gif_buttons[mov]);
		button_div.append(butt);
	}
}

$("#make-button").on("click", function(event)
{
	event.preventDefault();
	gif_buttons.push($("#search").val().trim());
	make_buttons();
	$("#search").val("");
});

$(document).on("click", ".gif-search-term", generate_gifs);
// $("#add-10").on("click", function append_gifs()
// {
// 	generate_gifs();
// });

make_buttons();