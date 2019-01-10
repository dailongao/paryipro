scalePlayers = function() {
	var width = $(window).width();
	var height = $(window).height();
	var blocks = liveChannels.length();

	var config = {
		blocksPerRow: 1,
		blocksPerColumn: blocks,
		width: -1,
		height: -1,
		area: -1
	};

	for (i = 1; i <= blocks; i++) {
		var maxBlocksPerRow = Math.ceil(blocks/i);
		var maxWidth;
		var maxHeight;

		// Scaled by width
		maxWidth = width/maxBlocksPerRow;
		maxHeight = maxWidth * 9/16;

		if (maxHeight*i > height) {
			// Scaled by height
			maxHeight = height/i;
			maxWidth = maxHeight * 16/9;
		}

		if (maxWidth * maxHeight > config.area) {
			config.area = maxWidth*maxHeight;
			config.width = maxWidth;
			config.height = maxHeight;
			config.blocksPerRow = maxBlocksPerRow;
			config.blocksPerColumn = i;
		}
	}

	// Floor config values for FF
	config.width = Math.floor(config.width);
	config.height = Math.floor(config.height);

	$(".player").css({
		"width": config.width + "px",
		"height": config.height + "px"
	});
	$("#player-container").css({
		"width": (config.width*config.blocksPerRow) + "px",
		"height": (config.height*config.blocksPerColumn) + "px",
		"margin-top": ((height-(config.height*config.blocksPerColumn))/2) + "px"
	});

	return config;
}

updateLiveChannelsData = function() {
	$.getJSON("paryi.pro", function(data) {
		return data;
	})
}

oldChannels = []
newChannels = []

addLivingChannels = function(channels) {
	
}

updatePage = function() {
	newChannels = updateLiveChannelsData()
	newLivingChannels = $(newChannels).not(oldChannels).get()
	notLivingChannels = $(oldChannels).not(newChannels).get()
	removeNotLivingChannels(notLivingChannels)
	addLivingChannels(newLivingChannels)
}

$(document).ready(function() {
  $.ajaxSetup({ cache: false });
});