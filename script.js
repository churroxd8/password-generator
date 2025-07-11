// Caracteres disponibles
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// TODO: Agregar opción para elegir el input
const passwordLength = 12;

// DOM
const passwordInput = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

// Función para generar la contraseña
function generatePassword() {
    const length = parseInt(document.getElementById("passwordLength").value);
    const includeLowercase = document.getElementById("includeLowercase").checked;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    let availableChars = "";
    if (includeLowercase) availableChars += lowercase;
    if (includeUppercase) availableChars += uppercase;
    if (includeNumbers) availableChars += numbers;
    if (includeSymbols) availableChars += symbols;

    if (availableChars === "") {
        alert("Selecciona al menos una opción de caracteres.");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }

    passwordInput.classList.add("flash");
    passwordInput.value = password;
    evaluateStrength(password);
    setTimeout(() => {
        passwordInput.classList.remove("flash");
    }, 300);
}



function evaluateStrength(password) {
  const indicator = document.getElementById("strengthIndicator");
  indicator.className = ""; // Limpia clases previas

  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++; // Longitud adicional
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  // Clasificación basada en puntuación
  if (strength <= 2) {
    indicator.textContent = "Fortaleza: Débil";
    indicator.classList.add("weak");
  } else if (strength <= 4) {
    indicator.textContent = "Fortaleza: Media";
    indicator.classList.add("medium");
  } else {
    indicator.textContent = "Fortaleza: Fuerte";
    indicator.classList.add("strong");
  }
}


// Función para copiar la contraseña al portapapeles
function copyPassword() {
    if (passwordInput.value) {
        navigator.clipboard.writeText(passwordInput.value);

        copyBtn.textContent = "✅ Copiado!";
        setTimeout(() => {
            copyBtn.textContent = "📋 Copiar";
        }, 1500);
    }
}
// Eventos
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);