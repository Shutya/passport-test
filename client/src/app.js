import routing from './routing';

const app = document.querySelector('#app');

window.addEventListener('hashchange', () => routing(app));

routing(app);