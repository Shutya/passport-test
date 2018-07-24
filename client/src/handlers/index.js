import service from '../service';
import user from '../data/user';

export const onClickLoginButton = (e) => {
  e.preventDefault();
  const form = document.forms.form;
  const password = form.password.value;
  const username = form.username.value;
  service.post('login', {username, password})
    .then(data => { window.location = data.redirect })
    .catch(console.log);
}

export const onClickRegisterButton = (e) => {
  e.preventDefault();
  const form = document.forms.form;
  const password = form.password.value;
  const username = form.username.value;
  service.post('register', {username, password})
    .then(data => { window.location = data.redirect })
    .catch(console.log);
}

export const onClickGithubButton = (e) => {
  e.preventDefault();
  location.href = process.env.GITHUB_LOGIN_URL
}

export const onClickLogout = (e) => {
  e.preventDefault();
  service.get('/logout')
    .then(data => { window.location = data.redirect })
    .catch(console.log);
}
