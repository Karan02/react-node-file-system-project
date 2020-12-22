import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return "Public"
    // return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return "User"
    // return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return "Moderator"
    // return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return "Admin"
    // return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
