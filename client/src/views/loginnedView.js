import { onClickLogout } from '../handlers';
import user from '../data/user';

export default function loginnedView (app) {
  const data = user.getUserData();

  const markup =
  `<main class="overlay">
    <div class="text-wrapper">
      <p>Congratulations, you are loginned!!!</p>
      <p>Hello, ${data.username ? `your username is ${data.username}` : 'you are not logined' }</p>
      <p><a id='logout' href='#'>Logout</a></p>
    </div>
  </main>`;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = markup;

  const logout = wrapper.querySelector('#logout');
  logout.addEventListener('click', onClickLogout);

  app.innerHTML = '';
  app.appendChild(wrapper);
}