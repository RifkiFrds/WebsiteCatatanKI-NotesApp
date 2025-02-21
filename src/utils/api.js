const BASE_URL = 'https://notes-api.dicoding.dev/v2'

const api = {
  async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`)
    if (!response.ok) throw new Error('Gagal mengambil catatan!')
    const result = await response.json()
    return result.data
  },

  async addNote(title, body) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    })

    if (!response.ok) throw new Error('Gagal menambahkan catatan!')
    return await response.json()
  },

  async deleteNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Gagal menghapus catatan!')
  },

  async archiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Gagal mengarsipkan catatan!')
  },

  async getArchivedNotes() {
    const response = await fetch(`${BASE_URL}/notes/archived`)
    if (!response.ok) throw new Error('Gagal mengambil catatan arsip!')
    const result = await response.json()
    return result.data
  },
}

export default api
