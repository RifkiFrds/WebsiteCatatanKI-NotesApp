import anime from 'animejs/lib/anime.es.js';

class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <nav>
        <div class="wrapper">
          <div class="logo"><a href="#">CatatanKI</a></div>
          <div class="menu-toggle">&#9776;</div>
          <div class="menu">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#" class="contact-link">Contact</a></li>
              <li><a href="#partners">Login</a></li>
              <li><a href="#" class="tbl-biru">Sign Up</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <style>
        :host {
          width: 100%;
          display: block;
        }

        nav {
          width: 100%;
          display: flex;
          justify-content: center;
          background: #ffffff;
          border-bottom: 2px solid #364f6b;
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 12px 20px;
          transition: all 0.3s ease-in-out;
        }

        .wrapper {
          width: 100%;
          max-width: 1100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo a {
          font-size: 35px;
          font-weight: bold;
          font-family: 'Poppins', sans-serif;
          color: #100254;
          text-decoration: none;
        }

        .menu {
          display: flex;
        }

        .menu ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          display: flex;
        }

        .menu ul li {
          margin: 0 15px;
        }

        .menu ul li a {
          color: #222;
          font-weight: bold;
          text-decoration: none;
          padding: 10px;
          transition: color 0.3s;
          cursor: pointer;
        }

        .menu ul li a:hover {
          text-decoration: underline;
          color: #fc5185;
        }

        a.tbl-biru {
          background-color: #3498db;
          border-radius: 20px;
          padding: 10px 15px;
          color: white;
          font-weight: bold;
          text-decoration: none;
          transition: background 0.3s ease-in-out;
        }

        a.tbl-biru:hover {
          background: #fc5185;
        }

        /* 🔹 Mobile Responsiveness */
        .menu-toggle {
          display: none;
          font-size: 24px;
          cursor: pointer;
        }

        @media screen and (max-width: 768px) {
          .menu {
            display: none;
            width: 100%;
            position: absolute;
            top: 60px;
            left: 0;
            background: white;
            flex-direction: column;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .menu ul {
            flex-direction: column;
            padding: 10px 0;
          }

          .menu ul li {
            padding: 10px 10px;
          }

          .menu-toggle {
            display: block;
          }
        }
      </style>
    `;
  }

  connectedCallback() {
    this.setupMenuToggle();
    this.animateNavbar();
    this.handleScroll();
    this.setupSmoothScroll();
  }

  setupMenuToggle() {
    const menuToggle = this.shadowRoot.querySelector('.menu-toggle');
    const menu = this.shadowRoot.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
      const isVisible = menu.style.display === 'flex';
      menu.style.display = isVisible ? 'none' : 'flex';

      if (!isVisible) {
        this.animateMenu();
      }
    });
  }

  animateNavbar() {
    anime({
      targets: this.shadowRoot.querySelector('nav'),
      opacity: [0, 1],
      duration: 800,
      easing: 'easeInOutQuad'
    });
  }

  animateMenu() {
    anime({
      targets: this.shadowRoot.querySelectorAll('.menu ul li'),
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      duration: 500,
      easing: 'easeOutQuad'
    });
  }

  handleScroll() {
    window.addEventListener('scroll', () => {
      const nav = this.shadowRoot.querySelector('nav');
      if (window.scrollY > 50) {
        nav.style.padding = '8px 20px';
        nav.style.background = '#ffffff';
        nav.style.borderBottom = '2px solid #fc5185';
      } else {
        nav.style.padding = '12px 20px';
        nav.style.background = '#ffffff';
        nav.style.borderBottom = '2px solid #364f6b';
      }
    });
  }

  setupSmoothScroll() {
    const contactLink = this.shadowRoot.querySelector('.contact-link');

    contactLink.addEventListener('click', (event) => {
      event.preventDefault();
      const footer = document.querySelector('Footer-App');

      if (footer) {
        window.scrollTo({
          top: footer.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }
}

customElements.define('app-bar', AppBar);
