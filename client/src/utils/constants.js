export const checkEmailURL = 'users/check-email/';
export const signupURL = 'users/signup/';
export const loginURL = 'users/login/';
export const apiURL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');
export const headers = {
  "Content-type": "application/json;charset=UTF-8"
};
if(token){
  headers['Authorization'] = `Bearer ${token}`;
}
