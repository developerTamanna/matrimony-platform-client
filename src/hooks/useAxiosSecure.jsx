import axios from 'axios';
const axiosSecure = axios.create({
  baseURL: ' https://metrimony-server-site.vercel.app',
/*   baseURL: 'http://localhost:3000', */
  withCredentials: true,
});

// Named function to set header (called manually)
export const setHeader = (user) => {
  if (user) {
    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers['authorization'] = JSON.stringify({
          name: user.displayName,
          email: user.email,
          role: user.role.role,
        });
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axiosSecure.interceptors.request.eject(interceptor);
  }
};

// Custom hook returning the axios instance
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
