import onHashChange from './routing';

const app = document.querySelector('#app');

window.addEventListener('hashchange', () => { onHashChange(app); });

onHashChange(app);