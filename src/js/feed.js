const posts = [
  {
    img: 'assets/img/post-limpeza-peeling.jpg',
    location: 'Vitória, ES',
    likes: 187,
    caption: '<strong>amandasarmento.esteta</strong> Antes e depois ✨ Limpeza de pele profunda + Peeling Coreano! Veja a diferença nos poros da região nasal — pele renovada, limpa e muito mais uniforme 🌿 <span style="color:var(--primary-dark)">#limpezadepele #peelingcoreano #antesedepois #poresminimizer #pelesaudável #vitóriaes</span>',
    comments: [
      { user: 'cah.rosa',    av: 'C', text: 'Que resultado incrível! Os poros sumiu 😱',        time: 'há 1 dia' },
      { user: 'mari.skin',   av: 'M', text: 'Preciso desse tratamento urgente! 🙌',             time: 'há 1 dia' },
      { user: 'ju.beleza',   av: 'J', text: 'Amei o resultado na região do nariz! 💕',          time: 'há 2 dias' },
      { user: 'carol_pele',  av: 'C', text: 'Quantas sessões foram necessárias?',               time: 'há 2 dias' },
      { user: 'tati.skin',   av: 'T', text: 'Já agendei o meu! 🔥',                             time: 'há 2 dias' },
      { user: 'bela.farma',  av: 'B', text: 'Melhor esteticista de Vitória! ❤️',                time: 'há 2 dias' },
    ]
  },
  {
    img: 'assets/img/post-limpeza-peeling-2.jpg',
    location: 'Studio Amanda Sarmento · Vitória, ES',
    likes: 241,
    caption: '<strong>amandasarmento.esteta</strong> Resultado real de cliente real 💕 Limpeza de pele profunda + Peeling Coreano — pele muito mais iluminada, poros refinados e textura uniforme em uma única sessão! ✨ <span style="color:var(--primary-dark)">#peelingcoreano #limpezaprofunda #antesedepois #skincareroutine #esteticafacial #farmacêutica</span>',
    comments: [
      { user: 'patty.pele',  av: 'P', text: 'Fiz na semana passada e amei demais! 💕',         time: 'há 3 dias' },
      { user: 'lu.vita',     av: 'L', text: 'Já agendei o meu! 🔥',                             time: 'há 3 dias' },
      { user: 'nanda.vita',  av: 'N', text: 'Essa luminosidade!! 😍',                           time: 'há 4 dias' },
      { user: 'gabi.glow',   av: 'G', text: 'Amanda é demais! Resultado perfeito 👏',           time: 'há 4 dias' },
      { user: 'sara.skin',   av: 'S', text: 'Uma sessão só e esse resultado?! Incrível!',       time: 'há 4 dias' },
      { user: 'deb.esteta',  av: 'D', text: 'Quero muito fazer esse procedimento!',             time: 'há 5 dias' },
    ]
  },
  {
    img: 'assets/img/post-limpeza-peeling-3.jpg',
    location: 'Studio Amanda Sarmento · Vitória, ES',
    likes: 163,
    caption: '<strong>amandasarmento.esteta</strong> Transformação na região das bochechas 🌸 Limpeza de pele + Peeling Coreano — textura suavizada, luminosidade de volta e aspecto muito mais saudável! Vem cuidar de você também 💆‍♀️ <span style="color:var(--primary-dark)">#limpezadepele #peelingcoreano #skincare #pelesaudável #luminosidade #esteticista</span>',
    comments: [
      { user: 'gabi.glow',   av: 'G', text: 'Minha pele te agradece, Amanda! ✨',               time: 'há 5 dias' },
      { user: 'nanda.vita',  av: 'N', text: 'Que diferença no brilho da pele! 😍',              time: 'há 6 dias' },
      { user: 'mari.skin',   av: 'M', text: 'Textura da pele impecável depois! 😱',             time: 'há 6 dias' },
      { user: 'carol_pele',  av: 'C', text: 'Vou agendar ainda essa semana! 🙌',                time: 'há 7 dias' },
    ]
  }
]

window.openModal = function(idx) {
  const p = posts[idx]
  document.getElementById('modalImg').src = p.img
  document.getElementById('modalLocation').textContent = p.location
  document.getElementById('modalLikes').textContent = p.likes + ' curtidas'
  const cc = document.getElementById('modalComments')
  cc.innerHTML = '<div class="modal-caption">' + p.caption + '</div>'
  p.comments.forEach(c => {
    cc.innerHTML += `
      <div class="modal-comment-item">
        <div class="modal-comment-av">${c.av}</div>
        <div>
          <div class="modal-comment-text"><strong>${c.user}</strong>${c.text}</div>
          <div class="modal-comment-time">${c.time}</div>
        </div>
      </div>`
  })
  document.getElementById('postModal').classList.add('open')
  document.body.style.overflow = 'hidden'
}

window.closeModal = function() {
  document.getElementById('postModal').classList.remove('open')
  document.body.style.overflow = ''
}

window.closeModalOutside = function(e) {
  if (e.target === document.getElementById('postModal')) window.closeModal()
}

window.toggleLike = function(btn) {
  const ico = btn.querySelector('i')
  const liked = ico.classList.contains('bi-heart-fill')
  ico.classList.toggle('bi-heart', liked)
  ico.classList.toggle('bi-heart-fill', !liked)
  btn.style.color = liked ? '' : '#e0334c'
  // update like count in card
  const body = btn.closest('.post-body, .modal-actions')
  if (body) {
    const likesEl = body.querySelector('.post-likes, .modal-likes')
    if (likesEl) {
      const n = parseInt(likesEl.textContent)
      likesEl.textContent = (liked ? n - 1 : n + 1) + ' curtidas'
    }
  }
}

window.toggleCommentLike = function(ico) {
  ico.classList.toggle('bi-heart')
  ico.classList.toggle('bi-heart-fill')
  ico.style.color = ico.classList.contains('bi-heart-fill') ? '#e0334c' : ''
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') window.closeModal() })
