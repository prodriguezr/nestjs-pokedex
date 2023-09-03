export const convertIPv6ToHostname = (url: string) => {
  return url.replace('[::1]', 'localhost');
};
