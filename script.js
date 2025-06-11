function appendValue(value) {
  document.getElementById('display').value += value;
}
function clearDisplay() {
  document.getElementById('display').value = '';
}
function calculateResult() {
  try {
    document.getElementById('display').value = eval(document.getElementById('display').value);
  } catch {
    document.getElementById('display').value = 'Erreur';
  }
}
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Toujours visible, mais déclenche l'installation seulement si possible
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('Résultat de l’installation :', outcome);
      deferredPrompt = null;
    } else {
      alert("Installation non disponible pour ce navigateur.");
    }
  });
});
