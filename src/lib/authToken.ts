let _token: any = null;

export const setAuthToken = (token: string) => {
  _token = token;
};

export const getAuthToken = () => {
  return _token;
};
