const drip = document.getElementById('drip');
const goku = document.getElementById('goku');

drip.addEventListener('play', () => {
  goku.style.display = 'block'; // show image when audio starts playing
});

drip.addEventListener('pause', () => {
  goku.style.display = 'none'; // hide image when audio pauses
});