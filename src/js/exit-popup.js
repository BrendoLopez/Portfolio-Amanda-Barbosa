const STORAGE_KEY = 'amanda_exit_shown';
const MIN_TIME_MS = 10000; // só mostra após 10's na página

const entryTime = Date.now();
let shown = false;

function shouldShow() {
  return (
    !shown &&
    !sessionStorage.getItem(STORAGE_KEY) &&
    (Date.now() - entryTime) >= MIN_TIME_MS
  );
}

function showExitPopup() {
  if (!shouldShow()) return;
  shown = true;
  sessionStorage.setItem(STORAGE_KEY, '1');
  document.getElementById('exitOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  if (typeof gtag !== 'undefined') {
    gtag('event', 'popup_exit_exibido');
  }
}

function closeExitPopup() {
  document.getElementById('exitOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

// Desktop: saída pelo topo da página
document.addEventListener('mouseleave', (e) => {
  if (e.clientY <= 5) showExitPopup();
});

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('exitOverlay');
  const form    = document.getElementById('exitForm');
  const input   = form && form.querySelector('.exit-input');

  if (!overlay || !form || !input) return;

  // Formatação de telefone brasileiro
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) {
      v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    } else if (v.length > 2) {
      v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    } else if (v.length > 0) {
      v = `(${v}`;
    }
    input.value = v;
  });

  // Submit: abre WhatsApp da Amanda com o número do lead na mensagem
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const digits = input.value.replace(/\D/g, '');
    if (digits.length < 10) {
      input.style.borderColor = 'var(--primary)';
      input.focus();
      return;
    }
    const msg = encodeURIComponent(
      `Olá Amanda! Vim pelo site e quero aproveitar o desconto de R$20 na primeira Limpeza Facial. Meu WhatsApp: ${input.value}`
    );
    if (typeof gtag !== 'undefined') {
      gtag('event', 'popup_exit_lead_capturado');
    }
    closeExitPopup();
    window.open(`https://wa.me/5527995085534?text=${msg}`, '_blank');
  });

  // Fecha ao clicar fora do popup
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeExitPopup();
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeExitPopup();
  });
});

// Expõe closeExitPopup globalmente para o botão "Não, obrigada"
window.closeExitPopup = closeExitPopup;
