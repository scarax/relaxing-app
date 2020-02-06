const app = () => {
  const song = document.querySelector('.app__sound');
  const playBtn = document.querySelector('.play-button');
  const btnIcon = document.querySelector('.play-button__icon');
  const outline = document.querySelector('.animated-outline circle');
  const video = document.querySelector('.video-bg');
  const display = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');
  // Sounds
  const sounds = document.querySelectorAll('.sound-picker__button');
  // Length of outline
  const outlineLength = outline.getTotalLength();
  // Duration by default
  let fakeDuration = 120;
  
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Play sound
  playBtn.addEventListener('click', () => {
    checkPlaying(song);
  })

  // Pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener('click', function() {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });

  // Select time duration
  timeSelect.forEach((option) => {
    option.addEventListener('click', function() {
      fakeDuration = this.getAttribute('data-time');
      display.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
    });
  })

  const checkPlaying = (sound) => {
    if(sound.paused) {
      sound.play();
      video.play();
      btnIcon.src = 'img/pause.svg';
    } else {
      sound.pause();
      video.pause();
      btnIcon.src = 'img/play.svg';
    }
  }

  // Progress time
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsedTime = fakeDuration - currentTime;
    let seconds = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);

    // Animate circle
    let progressBar = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progressBar;

    // Animate display
    display.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      video.pause();
      btnIcon.src = 'img/play.svg';
    }
  }
}
app();