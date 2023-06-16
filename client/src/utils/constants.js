export const checkEmailURL = 'users/check-email/';
export const signupURL = 'users/signup/';
export const loginURL = 'users/login/';
export const updateUserURL = "users/"
export const createGigURL = "gigs/";
export const sendMessageURL = "messages/";
export const getMessagesURL = "messages/conversationID/";
export const projectsURL = "projects/";
export const apiURL = process.env.REACT_APP_API_URL;
export const statesURL = "https://countriesnow.space/api/v0.1/countries/states";
export const citiesURL = "https://countriesnow.space/api/v0.1/countries/state/cities";
export const imgBBURL = "https://api.imgbb.com/1/upload";
export const ENV = process.env.NODE_ENV;
export const token = localStorage.getItem('token');
export const apiKey = process.env.REACT_APP_IMG_BB_API_KEY;
export const headers = {
  "Content-type": "application/json;charset=UTF-8"
};
if (token) {
  headers['Authorization'] = `Bearer ${token}`;
}
