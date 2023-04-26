export const checkEmailURL = 'users/check-email/';
export const signupURL = 'users/signup/';
export const loginURL = 'users/login/';
export const apiURL = process.env.REACT_APP_API_URL;
export const statesURL="https://countriesnow.space/api/v0.1/countries/states";
export const citiesURL="https://countriesnow.space/api/v0.1/countries/state/cities";
export const token = localStorage.getItem('token');
export const headers = {
  "Content-type": "application/json;charset=UTF-8"
};
if(token){
  headers['Authorization'] = `Bearer ${token}`;
}
