import api from '../utils/api.js'

class NotesApp extends HTMLElement {
  constructor() {
    super()
    this.notes = []
  }

  async connectedCallback() {
    this.loadingIndicator = document.querySelector('loading-indicator')
    this.notesList = document.querySelector('notes-list')

    await this.fetchNotes()
  }

  async fetchNotes() {
    try {
      this.loadingIndicator?.show()
      this.notes = await api.getNotes()
      this.notesList?.renderNotes(this.notes)
    } catch (error) {
      alert('Gagal mengambil catatan!')
    } finally {
      this.loadingIndicator?.hide()
    }
  }

  async addNote(note) {
    try {
      this.loadingIndicator?.show()
      const response = await api.addNote(note.title, note.body)
      if (!response) throw new Error('Gagal menambahkan catatan')
      await this.fetchNotes()
    } catch (error) {
      alert('Gagal menambahkan catatan!')
    } finally {
      this.loadingIndicator?.hide()
    }
  }
}

customElements.define('notes-app', NotesApp)
export default NotesApp


