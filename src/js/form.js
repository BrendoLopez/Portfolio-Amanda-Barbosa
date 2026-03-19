document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault()
  const name    = document.getElementById('inputName').value.trim()
  const email   = document.getElementById('inputEmail').value.trim()
  const message = document.getElementById('inputMessage').value.trim()
  if (!name || !email || !message) {
    alert('Por favor, preencha todos os campos obrigatórios (*).')
    return
  }
  alert('Mensagem enviada com sucesso! Entrarei em contato em breve. 💕')
  this.reset()
})
