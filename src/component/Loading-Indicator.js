import anime from 'animejs/lib/anime.es.js';
class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease-in-out;
        }

        .loading-container {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .loading-circle {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 6px solid transparent;
          border-top: 6px solid #00d4ff;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
        }

        .loading-text {
          position: absolute;
          bottom: -30px;
          width: 100%;
          text-align: center;
          font-size: 14px;
          color: white;
          font-family: Arial, sans-serif;
        }

        @media (max-width: 480px) {
          .loading-container {
            width: 50px;
            height: 50px;
          }
          .loading-text {
            font-size: 12px;
          }
        }
      </style>
      <div class="loading-overlay">
        <div class="loading-container">
          <div class="loading-circle"></div>
          <div class="loading-text">Memuat...</div>
        </div>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    `;

    this.createAnimation();
  }

  createAnimation() {
    const loadingCircle = this.shadowRoot.querySelector('.loading-circle');

    anime({
      targets: loadingCircle,
      rotate: '360deg',
      easing: 'linear',
      duration: 1000,
      loop: true,
    });
  }

  show() {
    const overlay = this.shadowRoot.querySelector('.loading-overlay');
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
  }

  hide() {
    const overlay = this.shadowRoot.querySelector('.loading-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.visibility = 'hidden';
    }, 300);
  }
}

customElements.define('loading-indicator', LoadingIndicator);
