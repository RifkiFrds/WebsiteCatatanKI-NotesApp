// utils/darkMode.js
const toggleButton = document.getElementById("darkModeToggle");

// Periksa mode sebelumnya dari localStorage
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  toggleButton.textContent = "☀️ Mode Terang";
}

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Simpan preferensi ke localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    toggleButton.textContent = "☀️ Mode Terang";
  } else {
    localStorage.setItem("darkMode", "disabled");
    toggleButton.textContent = "🌙 Mode Gelap";
  }
});
