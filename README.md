# What is this?

A tool to take a playlist and set the tempo for all songs to a fixed speed.

# Why?

Because the tempo slider in TheWaveVR is not very good right now.

# How do I use this?

You must have a valid `BPM` value in your MP3 ID3 tags.

1. Install ffmpeg (https://www.ffmpeg.org/)
2. Download this tool and unzip it into a directory
3. Install NodeJS (www.nodejs.org)
4. Open a command prompt, navigate to the unzipped tool directory and type `npm install`
5. Open `settings.json` and set the BPM you want for the playlist, as well as the path to ffmpeg. You will need to escape the `\` character (see the example in settings.json.)
6. Open `playlist.txt` and add the full path to your MP3 files, one per line. These are the files that will be rewritten to the new BPM. They will not be overwritten - new versions will be saved in this folder.
7. Run `node adjust.js`.

The script will run, and output your new files into the same directory as the script. Unfortunately, you will need to calculate the new offset (using Traktor) after running this, but you can then use my offset tool to write those values back into the ID3 tags.