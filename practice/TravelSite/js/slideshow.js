const slides = document.querySelectorAll("#slides > img");
const prev = document.getElementById("prev");
const next = document.getElementById('next');

prev.onclick = () => moveSlideIdx(-1);
next.onclick = () => moveSlideIdx(1);

// 이미지 위치를 나타내는 변수
var slideIndex = 1;
var tId = 0;

showSlides(slideIndex);

function moveSlideIdx(n) {    
  slideIndex += n;
  clearTimeout(tId);
  showSlides(slideIndex);
  console.log(slideIndex);
}

function showSlides(n) {
  if (n == undefined)
    n = ++slideIndex;

  if (n > slides.length)
    slideIndex = 1

  if (n < 1)
    slideIndex = slides.length

  slides.forEach(img => img.style.display = 'none');

  slides[slideIndex - 1].style.display = "block";
  tId = setTimeout(showSlides, 2500);
}