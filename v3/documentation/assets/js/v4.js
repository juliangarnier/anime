// V4

const $banner = document.querySelector('#top-banner');
const $closeBanner = document.querySelector('#close-banner');

function showBanner() {
  document.body.classList.add('has-banner');
}

function closeBanner() {
  document.body.classList.remove('has-banner');
}

setTimeout(showBanner, 2500);

$closeBanner.onclick = closeBanner;
