// TSimpleAudioPlayer, bults in a mp3 player in a HTML Element.
// Copyright (C) 2022  Tarcísio J. Santana Rodrigues <moccot@protonmail.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const TSimpleAudioPlayer = {};

TSimpleAudioPlayer.init = function(options) {
	this.autoPlay = options.autoPlay || false;
	this.srcs = options.srcs || [];
	this.currentAudio = null;

	var defaultAudioCoverSrc = 'https://previews.123rf.com/images/unkreatives/unkreatives1411/unkreatives141100014/33315052-illustrazione-dettagliata-di-un-record-di-vinile-nero-con-bianco-caso-della-copertura-vettore-eps10.jpg';
	var currentAudioIndex = null;

	var container = options.container || document.getElementById('tSimpleAudioPlayer');

	function generateElement(tag, id) {
		var element = document.createElement(tag);

		if (id)
			element.id = 'TSimpleAudioPlayer_' + id;

		return element;
	}

	var audioInfoWrapper = generateElement('div', 'audioInfo');

	var audioCoverWrapper = generateElement('div', 'audioCoverWrapper');
	var audioCoverImage = generateElement('img', 'audioCover');

	var audioTitleWrapper = generateElement('div', 'audioTitleWrapper');
	var audioTitle = generateElement('span', 'audioTitle');

	var audioControlWrapper = generateElement('div', 'audioControl');

	var progressBarWrapper = generateElement('div', 'progressBarWrapper');
	var progressBar = generateElement('input', 'progressBar');

	var buttonsWrapper = generateElement('div', 'buttonWrapper');
	var skipToStartButton = generateElement('button', 'skipToStartButton');
	var playButton = generateElement('button', 'playButton');
	var skipToEndButton = generateElement('button', 'skipToENdButton');

	var skipToStartIcon = generateElement('img');
	var playIcon = generateElement('img');
	var pauseIcon = generateElement('img');
	var skipToEndIcon = generateElement('img');

	audioCoverImage.src = defaultAudioCoverSrc;

	audioTitle.innerText = 'Audio Title';

	progressBar.type = 'range';
	progressBar.min = '0';
	progressBar.value = '0';

	skipToStartIcon.src = 'https://img.icons8.com/ios-glyphs/100/000000/skip-to-start--v1.png';
	playIcon.src = 'https://img.icons8.com/ios-glyphs/100/000000/play--v1.png';
	pauseIcon.src = 'https://img.icons8.com/ios-glyphs/100/000000/pause--v1.png';
	skipToEndIcon.src = 'https://img.icons8.com/ios-glyphs/100/000000/end--v1.png';

	container.style['padding'] = '5px';
	container.style['display'] = 'grid';
	container.style['grid-template-rows'] = '60% 40%';

	audioInfoWrapper.style['display'] = 'grid';
	audioInfoWrapper.style['grid-template-rows'] = '80% 20%';

	audioCoverWrapper.style['display'] = 'flex';
	audioCoverWrapper.style['justify-content'] = 'center';
	audioCoverWrapper.style['align-items'] = 'center';

	audioCoverImage.style['max-width'] = '95%';
	audioCoverImage.style['max-height'] = '95%';

	audioTitleWrapper.style['overflow'] = 'hidden';

	audioControlWrapper.style['display'] = 'grid';
	audioControlWrapper.style['grid-template-rows'] = '30% 70%';

	progressBarWrapper.style['display'] = 'flex';
	progressBarWrapper.style['justify-content'] = 'center';
	progressBarWrapper.style['align-items'] = 'center';
	progressBar.style['width'] = '95%';

	buttonsWrapper.style['display'] = 'grid';
	buttonsWrapper.style['grid-template-columns'] = '33.33% 33.33% 33.33%';

	pauseIcon.style['display'] = 'none';

	audioCoverWrapper.appendChild(audioCoverImage);

	audioTitleWrapper.appendChild(audioTitle);

	audioInfoWrapper.appendChild(audioCoverWrapper);
	audioInfoWrapper.appendChild(audioTitleWrapper);

	progressBarWrapper.appendChild(progressBar);

	buttonsWrapper.appendChild(skipToStartButton);
	buttonsWrapper.appendChild(playButton);
	buttonsWrapper.appendChild(skipToEndButton);

	skipToStartButton.appendChild(skipToStartIcon);
	playButton.appendChild(playIcon);
	playButton.appendChild(pauseIcon);
	skipToEndButton.appendChild(skipToEndIcon);

	for (let child of buttonsWrapper.children) {
		child.style['width'] = '95%';
		child.style['height'] = '95%';
		child.style['background'] = 'transparent';
		child.style['border'] = 'none';

		for (let childChild of child.children) {
			childChild.style['width'] = '100%';
			childChild.style['height'] = '100%';
		}
	}

	audioControlWrapper.appendChild(progressBarWrapper);
	audioControlWrapper.appendChild(buttonsWrapper);

	this.nextAudio = function() {
		var nextAudioIndex = currentAudioIndex + 1;

		if (this.srcs[nextAudioIndex]) {
			this.setCurrentAudio(nextAudioIndex);
			currentAudioIndex = nextAudioIndex;
		}
	};

	this.previousAudio = function() {
		var previousAudioIndex = currentAudioIndex - 1;

		if (this.srcs[previousAudioIndex]) {
			this.setCurrentAudio(previousAudioIndex);
			currentAudioIndex = previousAudioIndex;
		}
	};

	this.playAudio = function() {
		if (this.currentAudio) {
			this.currentAudio.play();
			playIcon.style['display'] = 'none';
			pauseIcon.style['display'] = 'initial';
		}
	};

	this.pauseAudio = function() {
		if (this.currentAudio) {
			this.currentAudio.pause();
			playIcon.style['display'] = 'initial';
			pauseIcon.style['display'] = 'none';
		}
	};

	this.setCurrentAudio = function(audioIndex) {
		if (this.currentAudio)
			this.pauseAudio();

		currentAudioIndex = audioIndex;

		var src = this.srcs[audioIndex];

		audioCoverImage.src = src.cover || defaultAudioCoverSrc;
		audioTitle.innerText = src.audio;
		this.currentAudio = new Audio(src.audio);

		this.currentAudio.oncanplay = () => {
			progressBar.max = this.currentAudio.duration;

			this.currentAudio.ontimeupdate = () => {
				progressBar.value = this.currentAudio.currentTime;
			};

			this.currentAudio.onended = () => {
				this.nextAudio();
			};

			if (this.autoPlay === true)
				this.playAudio();
		};
	};

	progressBar.onchange = () => {
		if (this.currentAudio)
			this.currentAudio.currentTime = progressBar.value;
		else
			progressBar.value = '0';
	};

	skipToStartButton.onclick = () => {
		if (this.currentAudio) {
			if (this.currentAudio.currentTime > 5)
				this.currentAudio.currentTime = 0;
			else
				this.previousAudio();
		}
	};

	playButton.onclick = () => {
		if (this.currentAudio) {
			if (this.currentAudio.paused)
				this.playAudio();
			else
				this.pauseAudio();
		}
	};

	skipToEndButton.onclick = () => {
		if (this.currentAudio)
			this.currentAudio.currentTime = this.currentAudio.duration;
	}

	container.appendChild(audioInfoWrapper);
	container.appendChild(audioControlWrapper);
};
