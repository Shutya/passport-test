import service from '../service';
import { setCookie, getCookie } from '../utils/cookie';
import user from '../data/user';

export const onClickLoginButton = (e) => {
  e.preventDefault();
  const form = document.forms.form;
  const password = form.password.value;
  const email = form.email.value;
  service.post('login', {
    email,
    password
  }).then(data => { location.hash = 'login-success' });
}

export const onClickRegisterButton = (e) => {
  e.preventDefault();
  const form = document.forms.form;
  const password = form.password.value;
  const email = form.email.value;
  service.post('register', {
    email,
    password
  }).then(data => { location.hash = 'login-success' });
}

export const onClickGithubButton = (e) => {
  e.preventDefault();
  location.href = process.env.GITHUB_LOGIN_URL
}

export const onClickLogout = (e) => {
  e.preventDefault();
  service.get('/logout')
    .then(data => {
      location.href = '';
    });
}
