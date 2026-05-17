export class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('load', () => this.resolve());
  }
  resolve() {
    const hash = location.hash.slice(1) || '/';
    const route = this.routes[hash] || this.routes['/'];
    const app = document.getElementById('app');
    app.innerHTML = route();
    window.scrollTo(0, 0);
    this.initReveals();
    this.initImages();
    document.dispatchEvent(new Event('routeChanged'));
  }
  initReveals() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }
  initImages() {
    document.querySelectorAll('.img-hover').forEach(img => {
      img.addEventListener('mouseenter', () => { img.style.filter = 'grayscale(0%)'; img.style.transform = 'scale(1.08)'; });
      img.addEventListener('mouseleave', () => { img.style.filter = 'grayscale(100%)'; img.style.transform = 'scale(1)'; });
    });
  }
  static navigate(path) { location.hash = path; }
}
