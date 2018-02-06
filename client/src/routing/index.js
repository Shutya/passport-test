import formView from '../views/formView';
import loginnedView from '../views/loginnedView';
import {checkLogin} from '../utils/login'

export default function onHashChange (app) {
  switch (location.hash) {
    case '':
      formView(app);
      break;
    case '#login-success':
      checkLogin().then(() => loginnedView(app));
      break;
    default:
      break;
  }
}
