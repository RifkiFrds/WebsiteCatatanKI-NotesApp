import Swal from 'sweetalert2';

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <h1>Buat Catatan Barumu!</h1>
      <form class="note-form">
        <input type="text" id="title" placeholder="Judul" required>
        <textarea id="body" placeholder="Isi Catatan" required></textarea>
        <button type="submit" id="myButton">Tambah</button>
      </form>
      <style>
       h1 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-family: 'Poppins', sans-serif;
  text-align: center;
  color: var(--text-color, #333);
  transition: color 0.3s ease-in-out;

  /* Efek gradasi opsional */
  background: linear-gradient(45deg, var(--primary-color, #3498db), var(--secondary-color, #fc5185));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

        .note-form {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(13, 13, 13, 0.1);
        }
        input, textarea {
          width: 100%;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          margin-bottom: 10px;
        }
        button {
          background-color: rgb(131, 218, 250);
          color: black;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
        }
        button:hover {
          background-color: #fc5185;
        }
      </style>
    `;
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector('form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const title = this.shadowRoot.querySelector('#title').value.trim();
      const body = this.shadowRoot.querySelector('#body').value.trim();

      if (title.length < 3 || body.length < 5) {
        Swal.fire('Error', 'Judul minimal 3 karakter dan isi minimal 5 karakter!', 'error');
        return;
      }

      // Cek apakah <notes-app> ada di DOM utama
      const notesAppInstance = document.querySelector('notes-app');
      if (!notesAppInstance) {
        console.error('Error: <notes-app> tidak ditemukan di DOM.');
        return;
      }

      await notesAppInstance.addNote({ title, body });
      form.reset();
    });
  }
}

customElements.define('note-form', NoteForm);
