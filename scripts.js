let list = document.querySelectorAll('.item-top');
let count = list.length;
let active = 0;

function nextSlide() {
    // Remove a classe active do slide atual
    list[active].classList.remove('active');

    // Avança para o próximo slide
    active = (active + 1) % count;

    // Adiciona a classe active ao próximo slide
    list[active].classList.add('active');
}

setInterval(nextSlide, 5000);

const recButt = document.querySelector(".text-butt");
const toggleBtn = document.querySelector(".toggle-info");
const containerInfo = document.querySelector(".container-info");

// Estado inicial
let collapsed = false;
let isAnimating = false; // bloqueio de clique durante transição

// Se o botão existe (tela pequena)
if (toggleBtn) {
    // Começa com texto visível
    containerInfo.classList.remove("collapsed");
    collapsed = false;
    toggleBtn.innerHTML = "⮟";

    toggleBtn.addEventListener("click", () => {
        if (isAnimating) return; // evita clique múltiplo
        isAnimating = true;

        collapsed = !collapsed;

        if (collapsed) {
            containerInfo.classList.add("collapsed");
            recButt.innerHTML = "Ocultar:";
            toggleBtn.innerHTML = "⮝";
        } else {
            containerInfo.classList.remove("collapsed");
            recButt.innerHTML = "Extender:";
            toggleBtn.innerHTML = "⮟";
        }

        // libera o clique após a transição (0.5s)
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    });
} else {
    // Sem botão (tela grande), texto visível
    containerInfo.classList.remove("collapsed");
}

/**/
// ================== CARROSSEL INFINITO ==================
const catalog = document.getElementById('catalog');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

// ----- Duplicar os produtos para criar efeito circular -----
catalog.innerHTML += catalog.innerHTML; // duplica o conteúdo
let isUserInteracting = false;

// ----- Rolagem automática constante -----
let scrollSpeed = 5.0; // controle da velocidade
let autoScroll;

function startAutoScroll() {
  stopAutoScroll();
  autoScroll = requestAnimationFrame(scrollLoop);
}

function stopAutoScroll() {
  cancelAnimationFrame(autoScroll);
}

function scrollLoop() {
  if (!isUserInteracting) {
    catalog.scrollLeft += scrollSpeed;
    // reinicia se chegar ao fim da metade (por causa da duplicação)
    if (catalog.scrollLeft >= catalog.scrollWidth / 2) {
      catalog.scrollLeft = 0;
    }
  }
  autoScroll = requestAnimationFrame(scrollLoop);
}

// ----- Controle das setas -----
// ----- Controle das setas (opcional) -----
if (rightArrow && leftArrow) {
  rightArrow.addEventListener('click', () => {
    catalog.scrollBy({ left: 250, behavior: 'smooth' });
  });

  leftArrow.addEventListener('click', () => {
    catalog.scrollBy({ left: -250, behavior: 'smooth' });
  });
}


// ----- Interações do usuário -----
let isDown = false;
let startX;
let scrollLeft;

// Mouse
catalog.addEventListener('mousedown', e => {
  isDown = true;
  isUserInteracting = true;
  startX = e.pageX - catalog.offsetLeft;
  scrollLeft = catalog.scrollLeft;
  stopAutoScroll();
});
catalog.addEventListener('mouseleave', () => {
  isDown = false;
  isUserInteracting = false;
  startAutoScroll();
});
catalog.addEventListener('mouseup', () => {
  isDown = false;
  isUserInteracting = false;
  startAutoScroll();
});
catalog.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - catalog.offsetLeft;
  const walk = (x - startX) * 2;
  catalog.scrollLeft = scrollLeft - walk;
});

// Touch
let touchStartX = 0;
catalog.addEventListener('touchstart', e => {
  isUserInteracting = true;
  touchStartX = e.touches[0].clientX;
  stopAutoScroll();
});
catalog.addEventListener('touchmove', e => {
  const touchMoveX = e.touches[0].clientX;
  catalog.scrollLeft += (touchStartX - touchMoveX) * 1.5;
  touchStartX = touchMoveX;
});
catalog.addEventListener('touchend', () => {
  isUserInteracting = false;
  startAutoScroll();
});

// Pausa automática ao passar o mouse
catalog.addEventListener('mouseenter', () => (isUserInteracting = true));
catalog.addEventListener('mouseleave', () => (isUserInteracting = false));

// Inicia o carrossel
startAutoScroll();
