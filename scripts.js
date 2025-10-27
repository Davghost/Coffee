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
