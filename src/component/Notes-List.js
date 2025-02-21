import anime from 'animejs/lib/anime.es.js'

class NotesList extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  renderNotes(notes) {
    this.shadowRoot.innerHTML = `<div class="notes-grid"></div>`
    const container = this.shadowRoot.querySelector('.notes-grid')

    notes.forEach((note) => {
      const card = document.createElement('note-card')
      card.noteData = note
      container.appendChild(card)
    })

    anime({
      targets: 'note-card',
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: window.innerWidth < 600 ? 500 : 800, // Lebih cepat di layar kecil
      delay: anime.stagger(100),
      easing: 'easeOutQuad',
    })
  }
}

customElements.define('notes-list', NotesList)

