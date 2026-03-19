import AOS from 'aos'

AOS.init({ duration: 680, once: true, offset: 55 })
document.getElementById('year').textContent = new Date().getFullYear()
