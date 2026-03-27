import AOS from 'aos'

AOS.init({ duration: 500, once: true, offset: 40 })
document.getElementById('year').textContent = new Date().getFullYear()
