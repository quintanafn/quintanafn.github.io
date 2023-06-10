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

function submitSelection() {
  if (selectedNumber === null) {
    alert("Por favor, selecione um número.");
    return;
  }

  selectedNumbers.push(selectedNumber.textContent);
  selectedNumber.classList.add("submitted");

  console.log("Números selecionados:", selectedNumbers);
  // Aqui você pode adicionar a lógica para processar os números selecionados, como salvá-los no servidor ou realizar alguma ação específica com eles

  disableSelection();
}

function disableSelection() {
  const numbers = document.getElementsByClassName("number");

  for (let i = 0; i < numbers.length; i++) {
    numbers[i].removeEventListener("click", selectNumber);
  }

  submitButton.disabled = true;
}

window.addEventListener("DOMContentLoaded", () => {
  const ipAddress = localStorage.getItem("selectedIPAddress");

  if (ipAddress) {
    // Aqui você pode adicionar a lógica para buscar os números selecionados por outros IPs no servidor ou outra fonte de dados
    // Vamos simular que os números 3, 5 e 8 já foram selecionados
    selectedNumbers = ["3", "5", "8"];

    showSelectedNumbers();

    disableSelection();
    alert(
      "Você já escolheu um número da sorte. Compre outro doce para ter outro número."
    );
  } else {
    localStorage.setItem("selectedIPAddress", "YOUR_IP_ADDRESS");
  }

  // Verifica se há mais de 100 números para mostrar o botão "Mostrar Mais"
  const numbers = document.getElementsByClassName("number");
  if (numbers.length > 100) {
    for (let i = 100; i < numbers.length; i++) {
      numbers[i].style.display = "none";
    }
    showMoreButton.style.display = "inline-block";
  }
});
