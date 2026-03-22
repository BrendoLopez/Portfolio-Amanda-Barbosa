const nav = document.getElementById('navbar')
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 55))

window.openMobile  = () => { document.getElementById('mobileMenu').classList.add('open');    document.body.style.overflow = 'hidden' }
window.closeMobile = () => { document.getElementById('mobileMenu').classList.remove('open'); document.body.style.overflow = '' }

// Scroll spy — destaca o link ativo na navbar conforme a seção visível
const sections = ['home','sobre','servicos','galeria','depoimentos','contato','localizacao']
const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]')

function setActive(id) {
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id)
  })
}

const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActive(entry.target.id)
  })
}, { rootMargin: '-40% 0px -55% 0px' })

sections.forEach(id => {
  const el = document.getElementById(id)
  if (el) spyObserver.observe(el)
})
