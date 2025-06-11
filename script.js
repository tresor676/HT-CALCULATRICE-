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

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';

  installBtn.addEventListener('click', async () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
    }
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', () => {
  console.log('PWA installed');
  installBtn.style.display = 'none';
});
