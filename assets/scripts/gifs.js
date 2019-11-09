var button_div = $("#button-holster");
var gif_div = $("#gif-holster");
var gif_buttons = ["funny animals", "not funny animals", "Venitian Snares", "perfect loops"];
var current_this;
var set_offset = 0;

function populate_gifs(movement)
{
	var search_term = $(movement).attr("data");
	var query_url = "https://api.giphy.com/v1/gifs/search?q=" + search_term + "&offset=" + set_offset + "&limit=10&api_key=mNG9esGV3v2gUw30rS2w2EoLioJ8eu98";

	$.ajax({
		url: query_url,
		method: "GET"
	}).then(function(response)
	{
		var select = response.data;

		for(var dis = 0; dis < select.length; dis++)
		{
			var new_div = $("<div>");
			var new_img = $("<img>");
			var new_p = $("<p>");

			new_p.text("Rating: " + select[dis].rating);
			new_img.attr("src", select[dis].images.fixed_height_still.url);
			new_img.attr("paused-img", select[dis].images.fixed_height_still.url);
			new_img.attr("played-img", select[dis].images.fixed_height.url);
			new_img.attr("is-paused", "paused");
			new_img.attr("class", "gif-img");


			new_div.append(new_img, new_p);
			new_div.css("float", "left");
			gif_div.append(new_div);

			$("#add-10").css("visibility", "visible");
		}
	});
}

function make_buttons()
{
	button_div.empty();

	for(var mov = 0; mov < gif_buttons.length; mov++)
	{
		var butt = $("<button>");
		var butt_str = gif_buttons[mov].split(" ").join("+");
		butt.addClass("gif-search-term");
		butt.attr("data", butt_str);
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

$(document).on("click", ".gif-search-term", function generate_gifs()
{
	current_this = this;
	set_offset = 0;
	gif_div.empty();
	populate_gifs(current_this);
});

$(document).on("mouseenter", ".gif-img", function unpause()
{
	$(this).attr("src", $(this).attr("played-img"));
	$(this).attr("is-paused", "unpaused");
});

$(document).on("mouseout", ".gif-img", function pause()
{
	$(this).attr("src", $(this).attr("paused-img"));
	$(this).attr("is-paused", "paused");
});

$(document).on("click", ".gif-img", function pause_unpause()
{
	var pause_check = $(this).attr("is-paused");
	if(pause_check === "paused") //this is never true for some reason. I'm checking the attribute wrong somehow.
	{
		$(this).attr("src", $(this).attr("played-img"));
		$(this).attr("is-paused", "unpaused");
	}
	else
	{
		$(this).attr("src", $(this).attr("paused-img"));
		$(this).attr("is-paused", "paused");
	}
});

$("#add-10").on("click", function add_gifs()
{
	set_offset += 10;
	populate_gifs(current_this);
});

make_buttons();