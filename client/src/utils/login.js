import user from '../data/user';
import service from '../service';

export const checkLogin = () => {
  if(user.userdata && !user.userdata.logined) {
    return service.get('me')
      .then(data => {
        user.setUserdata(data);
      })
  } else {
    return Promise.resolve();
  }
}