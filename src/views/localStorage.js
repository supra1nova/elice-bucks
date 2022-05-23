export const getUserData = () => {
  return localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : { userId: '', role: '' };
};
