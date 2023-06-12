const numbersContainer = document.getElementById("numbers-container");
const showMoreButton = document.getElementById("show-more-button");
const submitButton = document.getElementById("submit-button");

let selectedNumber = null;
let selectedNumbers = [];

// Cria os números de 1 a 800
for (let i = 1; i <= 800; i++) {
  const number = document.createElement("div");
  number.classList.add("number");
  number.textContent = i;
  number.addEventListener("click", selectNumber);
  numbersContainer.appendChild(number);
}

// Event listener para o botão "Mostrar Mais"
showMoreButton.addEventListener("click", showMoreNumbers);

function showMoreNumbers() {
  const numbers = document.getElementsByClassName("number");

  // Exibe os números restantes a partir do número 101
  for (let i = 100; i < numbers.length; i++) {
    numbers[i].style.display = "inline-block";
  }

  // Oculta o botão "Mostrar Mais"
  showMoreButton.style.display = "none";
}

function selectNumber(event) {
  const clickedNumber = event.target;

  if (selectedNumber !== null) {
    selectedNumber.classList.remove("selected");
  }

  if (clickedNumber === selectedNumber) {
    selectedNumber = null;
  } else {
    clickedNumber.classList.add("selected");
    selectedNumber = clickedNumber;
  }
}

async function submitSelection() {
  if (selectedNumber === null) {
    alert("Por favor, selecione um número.");
    return;
  }

  selectedNumbers.push(selectedNumber.textContent);
  selectedNumber.classList.add("submitted");

  console.log("Números selecionados:", selectedNumbers);

  // Envia a seleção para o servidor
  const response = await fetch("/selecoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ipAddress: "YOUR_IP_ADDRESS", // Substitua pelo endereço IP real do usuário
      selectedNumber: selectedNumber.textContent,
    }),
  });

  if (response.ok) {
    console.log("Seleção registrada com sucesso.");
  } else {
    console.error("Erro ao registrar seleção:", response.statusText);
  }

  disableSelection();
}

function disableSelection() {
  const numbers = document.getElementsByClassName("number");

  for (let i = 0; i < numbers.length; i++) {
    numbers[i].removeEventListener("click", selectNumber);
  }

  submitButton.disabled = true;
}

window.addEventListener("DOMContentLoaded", async () => {
  // Busca os números selecionados por outros usuários
  const response = await fetch("/selecoes");

  if (response.ok) {
    const selecoes = await response.json();
    selectedNumbers = selecoes.map((selecao) => selecao.selectedNumber);

    showSelectedNumbers();
  } else {
    console.error("Erro ao obter as seleções:", response.statusText);
  }
});

function showSelectedNumbers() {
  const numbers = document.getElementsByClassName("number");

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    const numberValue = number.textContent;

    if (selectedNumbers.includes(numberValue)) {
      number.classList.add("selected");
      number.classList.add("submitted");
    }
  }
}
