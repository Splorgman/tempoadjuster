var fs = require('fs-extra');
var nodeid3 = require('node-id3');
var exec = require('child_process').execSync;

var settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
var array = fs.readFileSync('playlist.txt').toString().split("\r\n");

for(i in array) {
    var file = array[i];
    if (fs.exists(file)) {
    	convertFile(file);
	} else {
		console.log('\x1b[31m',"Could not find " + file + ", skipping!");
	};
}

function convertFile(file) {
	console.log('\x1b[36m',"Converting " + file);
	var tags = nodeid3.read(file, function(err, tags) {
		var outputPath = tags.artist + ' - ' + tags.title + '.mp3';
		var existingBpm = tags.bpm;

		if (existingBpm != settings.bpm) {
			console.log("Existing BPM is " + existingBpm + ", updating to " + settings.bpm);

			var tempoChange = settings.bpm / existingBpm;
			
			console.log("Tempo change is " + tempoChange + ', writing to ' + outputPath);

			var args = [
				'-i', file,
				'-filter:a', 'atempo=' + tempoChange,
				outputPath
			];

			exec(settings.ffmpeg_binary + ' -y -i "' + file + '" -q:a 0 -filter:a "atempo=' + tempoChange + '" "' + outputPath + '"', (error, stdout, stderr) => {
				if (error) {
					console.error('Error: ' + error);
					return;
				}
			});

			//I rewrite the album art here, because ffmpeg seems to chew it up.
			var newTags = {
				"bpm": settings.bpm,
				"APIC": tags.raw.APIC
			}

			var success = nodeid3.update(newTags, outputPath);
			if (success !== true) {
				console.log('\x1b[31m',"Failed to update " + outputPath);
			}
		} else {
			console.log("Copying " + file + " to " + outputPath);
			fs.copySync(file, outputPath);
		}
	});
}