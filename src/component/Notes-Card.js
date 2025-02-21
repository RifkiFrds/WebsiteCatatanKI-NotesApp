import api from '../utils/api.js'
import anime from 'animejs/lib/anime.es.js'

class NoteCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  set noteData(data) {
    this.data = data // Simpan data agar bisa diubah nanti

    this.shadowRoot.innerHTML = `
      <style>
        .note-card { 
          background: white; 
          padding: 15px; 
          border-radius: 8px; 
          box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
          margin-bottom: 10px; 
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .note-title { font-weight: bold; }
        .buttons { display: flex; gap: 10px; margin-top: 10px; }
        button {
          background-color: rgb(131, 218, 250); 
          color: black;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color:  #fc5185;
        }
      </style>
      <div class="note-card">
        <h3 class="note-title">${data.title}</h3>
        <p>${data.body}</p>
        <div class="buttons">
          <button class="delete-btn">Hapus</button>
          <button class="archive-btn">${data.archived ? 'Buka Arsip' : 'Arsipkan'}</button>
        </div>
      </div>
    `

    const archiveBtn = this.shadowRoot.querySelector('.archive-btn')

    // Tombol Hapus dengan Animasi
    this.shadowRoot.querySelector('.delete-btn').addEventListener('click', async () => {
      const card = this.shadowRoot.querySelector('.note-card')
      anime({
        targets: card,
        opacity: 0,
        translateX: -50,
        duration: 500,
        easing: 'easeInOutQuad',
        complete: async () => {
          await api.deleteNote(data.id)
          document.querySelector('notes-app').fetchNotes()
        }
      })
    })

    // Tombol Arsip / Buka Arsip
    archiveBtn.addEventListener('click', async () => {
      if (this.data.archived) {
        await api.unarchiveNote(data.id) // Buka Arsip
        this.data.archived = false
      } else {
        await api.archiveNote(data.id) // Arsipkan
        this.data.archived = true
      }
      
      // Update tombol sesuai status terbaru
      archiveBtn.textContent = this.data.archived ? 'Buka Arsip' : 'Arsipkan'

      // Refresh daftar catatan
      document.querySelector('notes-app').fetchNotes()
    })
  }
}

customElements.define('note-card', NoteCard)
