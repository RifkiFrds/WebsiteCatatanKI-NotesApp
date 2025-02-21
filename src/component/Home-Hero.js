import anime from 'animejs/lib/anime.es.js';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

class HomeHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
    this.addAnimations();
    this.initSwiper();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .hero {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          text-align: left;
          height: 90vh;
          background: rgb(131, 218, 250);
          color: white;
          padding: 20px;
          position: relative;
          gap: 30px;
        }

        .hero-content {
          max-width: 50%;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        p {
          font-size: 1.2rem;
          max-width: 600px;
          line-height: 1.5;
        }

        .cta-btn {
          margin-top: 20px;
          padding: 12px 24px;
          font-size: 1.2rem;
          background: #ff6f61;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .cta-btn:hover {
          background: #d54a4a;
        }

        .hero img {
          max-width: 40%;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 4px 1px rgba(0, 0, 0, 0.2);
        }

 .features {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 50px;
        flex-wrap: wrap;
        overflow: auto;
      }

        .features-container {
          max-width: 100%;
          padding: 20px;
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .swiper {
          width: 100%;
          height: auto;
          display: none;
        }

        .swiper-wrapper {
          display: flex;
          align-items: center;
        }

        .feature-card {
          background: white;
          color: black;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          transition: transform 0.3s ease;
          width: 250px;
          margin: auto;
        }

        .feature-card:hover {
          transform: scale(1.05);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 10px;
          color: #ff6f61;
        }

        .swiper-pagination {
          margin-top: 10px;
        }

        .swiper-button-prev,
        .swiper-button-next {
          color: #ff6f61;
        }

        @media screen and (max-width: 768px) {
          .features-container {
            display: none;
          }

          .swiper {
            display: block;
          }
                  @media screen and (max-width: 1024px) {
        .hero {
          flex-direction: column;
          text-align: center;
        }

        .hero-content {
          max-width: 80%;
        }

        .hero img {
          max-width: 60%;
        }
      }

      @media screen and (max-width: 768px) {
        h1 {
          font-size: 1.8rem;
        }

        p {
          font-size: 1rem;
          max-width: 90%;
        }

        .cta-btn {
          font-size: 1rem;
          padding: 10px 20px;
        }
            @media screen and (max-width: 480px) {
        h1 {
          font-size: 1.5rem;
        }

        p {
          font-size: 0.9rem;
        }

        .cta-btn {
          font-size: 0.9rem;
          padding: 8px 16px;
        }

        .hero img {
          max-width: 80%;
        }
      </style>

      <div class="hero">
        <div class="hero-content">
          <h1>Simpan Ide Kapan Saja, Di Mana Saja!</h1>
          <p>Catat semua ide brilianmu dan akses dengan mudah kapan saja. Buatlah inspirasi!</p>
          <button class="cta-btn" id="start-btn">Mulai Sekarang</button>
        </div>
        <img src="/images/gambar.png" alt="gambar">
      </div>

      <div class="features-container">
        <div class="feature-card">
          <div class="feature-icon">📝</div>
          <h3>Mudah Digunakan</h3>
          <p>Catat ide dalam hitungan detik dengan tampilan yang simpel dan elegan.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">☁️</div>
          <h3>Akses Dimanapun</h3>
          <p>Catatanmu tersimpan di cloud dan bisa diakses kapanpun kamu butuh.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Aman & Terlindungi</h3>
          <p>Privasi Anda data terjaga dengan sistem keamanan terbaik.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌙</div>
          <h3>Mode Gelap</h3>
          <p>Mata tetap nyaman dan hemat daya baterai ketika klik tombol Mode Gelap.</p>
        </div>
      </div>

      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="feature-card">
              <div class="feature-icon">📝</div>
              <h3>Mudah Digunakan</h3>
              <p>Catat ide dalam hitungan detik dengan tampilan yang simpel dan elegan.</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="feature-card">
              <div class="feature-icon">☁️</div>
              <h3>Akses Dimanapun</h3>
              <p>Catatanmu tersimpan di cloud dan bisa diakses kapanpun kamu butuh.</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3>Aman & Terlindungi</h3>
              <p>Privasi Anda data terjaga dengan sistem keamanan terbaik.</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="feature-card">
              <div class="feature-icon">🌙</div>
              <h3>Fitur Mode Gelap</h3>
              <p>Mata tetap nyaman dan hemat daya baterai ketika klik tombol Mode Gelap.</p>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
      </div>
    `;
  }

  addEventListeners() {
    const button = this.shadowRoot.querySelector('#start-btn');
    button.addEventListener('click', () => {
      const noteForm = document.querySelector('note-form');
      if (noteForm) {
        noteForm.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  addAnimations() {
    anime({
      targets: this.shadowRoot.querySelectorAll('.feature-card'),
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(200),
      easing: 'easeOutExpo'
    });
  }

  initSwiper() {
    new Swiper(this.shadowRoot.querySelector('.swiper'), {
      modules: [Pagination, Autoplay, Navigation],
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: this.shadowRoot.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: this.shadowRoot.querySelector('.swiper-button-next'),
        prevEl: this.shadowRoot.querySelector('.swiper-button-prev'),
      },
    });
  }
}

customElements.define('home-hero', HomeHero);
