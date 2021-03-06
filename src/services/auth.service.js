import axios from 'axios';
import { RepositoryAPI } from '../../public/config'

class AuthService {
  async login(user) {
    this.LoginBody = {
      path: '/Account/Login',
      method: 'POST',
      data: {
        username: user.username,
        password: user.password
      },
    }
    let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.LoginBody.path

    const response = await axios
      .post(requestPath, this.LoginBody.data);
    if (response.data.token) {
      sessionStorage.setItem('user', JSON.stringify(response.data));
      sessionStorage.setItem('access_token', JSON.stringify(response.data.token));
      //axios.defaults.headers.common['Authorization']=response.data.token
    }
    return response.data;
  }

  logout() {
    sessionStorage.removeItem('user');
  }
}

export default new AuthService();
