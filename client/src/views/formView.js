import { onLocalAuth, onClickGithubButton } from '../handlers';

export default function formView (app) {
  const markup =
  `<main class="overlay">
    <form name="form" class="form-wrapper login-panel">
      <header>
        <div class="left logo">
          <p><span>Pasport</span> test authorization</a>
        </div>
      </header>

      <div class="login-form">
        <div class="subtitle">Login or register</div>
        <input name="username" type="text" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
      </div>

      <footer>
        <div class="left social-login">
          Login with
          <a id='github' href="#"><i class="fa fa-fw fa-github"></i></a>
        </div>

        <div class="right form-actions">
          <a id="login" href='#' class="ui-button inactive login">Login</a>
          <a id="register" href='#' class="ui-button inactive register">Register</a>
        </div>
      </footer>
    </form>
  </main>`;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = markup;

  const githubButton = wrapper.querySelector('#github');
  const loginButton = wrapper.querySelector('#login');
  const registerButton = wrapper.querySelector('#register');
  githubButton.addEventListener('click', onClickGithubButton);
  loginButton.addEventListener('click', onLocalAuth('login'));
  registerButton.addEventListener('click', onLocalAuth('register'));

  app.innerHTML = '';
  app.appendChild(wrapper);
}