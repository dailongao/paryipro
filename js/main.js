var oldChannels = []
var newChannels = []

scalePlayers = function() {
	var width = $(window).width();
	var height = $(window).height();
	var blocks = newChannels.length;

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
	return $.parseJSON($.ajax({ 
		url: 'paryi.pro', 
		async: false
	}).responseText);
}

addBlock = function(videoId) {
	$("#player-container").append("<div class='player' id='player-" + videoId + "'></div>")
	$("#player-" + videoId).append("<iframe id='ytplayer-" + videoId + "' type='text/html' src='http://www.youtube.com/embed/" + videoId + "' frameborder='0'/>")
}

removeBlock = function(videoId) {
	$("#player-" + videoId).remove()
}

addLivingChannels = function(channels) {
	$.each(channels, function(index, value) {
		addBlock(value)
	})
}

removeNotLivingChannels = function(channels) {
	$.each(channels, function(index, value) {
		removeBlock(value)
	})
}

updatePage = function() {
	newChannels = updateLiveChannelsData()
	newLivingChannels = $(newChannels).not(oldChannels).get()
	notLivingChannels = $(oldChannels).not(newChannels).get()
	removeNotLivingChannels(notLivingChannels)
	addLivingChannels(newLivingChannels)
	scalePlayers();
	oldChannels = newChannels
}

$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  $(window).resize(function() {
	scalePlayers();  
  })
  // UpdatePage
  updatePage();
  // Update Timer
  setInterval(function() {
	  updatePage();
  }, 60000);
});