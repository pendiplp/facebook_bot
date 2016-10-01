function runLike() {
	bot_like.access_token = "EAAAAxxx";
	bot_like.run();	
}

var bot_like = {
	run: function() {
		var fbid,
			post_like,
			status = this.getFriendsStatus();
		if (!status) return;

		for (i in status) {
			fbid = status[i]['post_id'];
			post_like = this.cURL("https://graph.facebook.com/" + fbid + "/likes?method=post&access_token=" + this.access_token); 
			Logger.log(fbid + " : " + post_like);
		}
	},

	getFriendsStatus: function() {
		var fql 	= "SELECT post_id FROM stream WHERE source_id IN (SELECT uid2 FROM friend WHERE uid1=me()) AND likes.user_likes != 'true'";
		var data 	= this.cURL("https://api.facebook.com/method/fql.query?query=" + encodeURI(fql) + "&limit=50&format=json&access_token=" + this.access_token);
		
		if (data.error_code) {
			Logger.log(data.error_msg);
			return null;
		}

		return data;
	},

	cURL: function(url) {
		var fetch_url  = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
		var to_json = JSON.parse(fetch_url.getContentText());
		return to_json;
	}
}
