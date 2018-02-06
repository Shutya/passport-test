class User {
  constructor () {
    this.userdata = {
      logined: false,
      data: {}
    }
  }

  setUserdata (userdata) {
    this.userdata = {
      logined: true,
      data: userdata || {}
    }
  }

  getUserData () {
    return this.userdata.data;
  }
}

const user = new User();

export default user; 