class FooterApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <footer>
        <div class="footer-content">
          <nav aria-label="Secondary navigation">
            <ul>
              ${this.generateNavLinks()}
            </ul>
          </nav>
          <div class="social-media">
            ${this.generateSocialLinks()}
          </div>
          <p>&copy; ${new Date().getFullYear()} CatatanKI | Muhamad Rifki Firdaus</p>
        </div>
      </footer>
      <style>
        footer {
          background-color: var(--primary-color,#2b5075);
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: white;
          animation: fadeIn 0.7s ease-in-out;
          width: 100%;
          box-sizing: border-box;
          margin-top: auto;
          transition: background 0.3s ease-in-out;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }

        nav ul {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        nav ul li a {
          text-decoration: none;
          color: white;
          font-weight: bold;
          padding: 0.5rem;
          transition: opacity 0.3s ease, transform 0.2s ease;
        }

        nav ul li a:hover {
          color: #ff6f61;
          transform: scale(1.1);
        }

        .social-media {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin: 1.5rem 0;
        }

        .social-media a {
          display: inline-block;
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .social-media a:hover {
          transform: translateY(-4px);
          filter: brightness(1.2);
        }

        .social-media img {
          width: 32px;
          height: 32px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 480px) {
          nav ul {
            flex-direction: column;
          }
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
          footer {
            background-color:hsl(250, 80.70%, 51.20%);
          }
          nav ul li a {
            color: #f1f1f1;
          }
          .social-media a:hover {
            filter: brightness(1.5);
          }
        }
      </style>
    `;
  }

  generateNavLinks() {
    const links = [
      { path: '/about', label: 'Tentang' },
      { path: 'mailto:muhamadrifkifirdaus22@gmail.com', label: 'Kontak' },
      { path: '/privacy-policy', label: 'Kebijakan Privasi' },
      { path: 'https://github.com/RifkiFrds', label: 'GitHub' }
    ];
    
    return links.map(link => `
      <li>
        <a href="${link.path}" target="_blank">${link.label}</a>
      </li>
    `).join('');
  }

  generateSocialLinks() {
    const socials = [
      { name: 'Facebook', url: 'https://www.facebook.com/Rifkibkbf420?mibextid=LQQJ4d&rdid=RUs0eTqie6R3Utmw&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19Sr4aeWcs%2F%3Fmibextid%3DLQQJ4d#', icon: '/icons/facebook.svg' },
      { name: 'Twitter', url: 'https://twitter.com', icon: '/icons/twitter.svg' },
      { name: 'Instagram', url: 'https://www.instagram.com/frdskii_/profilecard/?igsh=MXRwN3NuZHR3Ym5zMg%3D%3D', icon: '/icons/instagram.svg' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/muhamad-rifki-firdaus-27a925317', icon: 'icons/linkedin.svg' }      
    ];
    
    return socials.map(social => `
      <a href="${social.url}" target="_blank" rel="noopener noreferrer" aria-label="${social.name}">
        <img src="${social.icon}" alt="${social.name} icon">
      </a>
    `).join('');
  }
}

customElements.define('footer-app', FooterApp);
