const nav = document.getElementById('navbar')
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 55))

window.openMobile  = () => { document.getElementById('mobileMenu').classList.add('open');    document.body.style.overflow = 'hidden' }
window.closeMobile = () => { document.getElementById('mobileMenu').classList.remove('open'); document.body.style.overflow = '' }
