# TSimpleAudioPlayer
A HTML embedable audio player.

## Installing
Clone the repository.

```
git clone https://github.com/moccot/t-simple-audio-player/
```

## Using
Add the script to your HTML page (The script will create an object called TSimpleAudioPlayer).
```html
<script src="path-to-the-t-simple-audio-player-folder/dist/index.js"></script>
```

Then use the method ```init``` passing the options.

Below there is the options with their default values.
```javascript
TSimpleAudioPlayer.init({
  container: document.getElementById('tSimpleAudioPlayer'), // The element the audio player will be embed into.
  autoPlay: false, // If true audios will start playing as soon as they load. If false audios will only play if the play button is pressed.
  srcs: [] // The sources for the audios and their covers. The audio source is mandatory, but its cover is not.
});
```

The objects in ```srcs``` have to be like this.
```javascript
{ audio: 'link-to-the-audio-file', cover: 'link-to-the-cover-image-file' } // If there is no cover for the audio, leave it undefined or supply a falsy, a default cover image will be displayed for the audio.
```

After calling the ```init``` method and passing the options, use the method ```setCurrentAudio``` passing the index of the source in srcs to start playing the audios.
```javascript
TSimpleAudioPlayer.setCurrentAudio(0) // Starts playing the first audio.
```

Also there is a demo at the ```demo``` folder.
