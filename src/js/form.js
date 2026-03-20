// ── Máscara de telefone brasileiro ──────────────────────────────────────────
const phoneInput = document.getElementById('inputPhone')
phoneInput.addEventListener('input', function () {
  let v = this.value.replace(/\D/g, '').slice(0, 11)
  if (v.length <= 10) {
    v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  } else {
    v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  }
  this.value = v
})

// ── Contador de caracteres da mensagem ──────────────────────────────────────
const messageInput = document.getElementById('inputMessage')
const charCount    = document.getElementById('charCount')
messageInput.addEventListener('input', function () {
  const len = this.value.length
  charCount.textContent = len + ' / 1000'
  charCount.style.color = len > 900 ? 'var(--primary)' : 'var(--text-light)'
})

// ── Validação de e-mail ─────────────────────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ── Feedback visual ─────────────────────────────────────────────────────────
const feedback = document.getElementById('formFeedback')
let feedbackTimer

function showFeedback(type, msg) {
  clearTimeout(feedbackTimer)
  feedback.className = 'form-feedback ' + type
  feedback.innerHTML = msg
  feedback.style.display = 'block'
  feedbackTimer = setTimeout(() => { feedback.style.display = 'none' }, 7000)
}

// ── Envio do formulário via Web3Forms ───────────────────────────────────────
const form = document.getElementById('contactForm')
const btn  = document.getElementById('submitBtn')

form.addEventListener('submit', async function (e) {
  e.preventDefault()

  const name    = document.getElementById('inputName').value.trim()
  const email   = document.getElementById('inputEmail').value.trim()
  const message = document.getElementById('inputMessage').value.trim()

  if (!name || !email || !message) {
    showFeedback('error', '<i class="bi bi-exclamation-circle"></i> Preencha todos os campos obrigatórios (*).')
    return
  }
  if (!isValidEmail(email)) {
    showFeedback('error', '<i class="bi bi-exclamation-circle"></i> Informe um e-mail válido.')
    return
  }

  btn.disabled    = true
  btn.innerHTML   = 'Enviando… <i class="bi bi-hourglass-split"></i>'

  try {
    const res  = await fetch('https://api.web3forms.com/submit', {
      method : 'POST',
      body   : new FormData(form)
    })
    const json = await res.json()

    if (json.success) {
      showFeedback('success', '<i class="bi bi-check-circle"></i> Mensagem enviada com sucesso! Entrarei em contato em breve. 💕')
      form.reset()
      charCount.textContent = '0 / 1000'
    } else {
      showFeedback('error', '<i class="bi bi-exclamation-circle"></i> Ocorreu um erro ao enviar. Tente me chamar pelo WhatsApp.')
    }
  } catch {
    showFeedback('error', '<i class="bi bi-wifi-off"></i> Erro de conexão. Tente novamente ou me chame pelo WhatsApp.')
  } finally {
    btn.disabled  = false
    btn.innerHTML = 'Enviar Mensagem <i class="bi bi-send"></i>'
  }
})
