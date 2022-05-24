//import jwt_decode from 'jwt-decode';
//const jwt_decode = required('jwt-decode');

export const getUserData = () => {
  const token = localStorage.getItem('token');
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  if (token) {
    return JSON.parse(jsonPayload);
  } else {
    return { userId: '', role: '' };
  }
};
