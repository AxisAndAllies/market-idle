import { useFetch } from 'use-http';

const API_ROOT = 'http://localhost:8000';

function useApi(url, opts = {}, ...rest) {
  // Prefix URL with API root
  const finalUrl = `${API_ROOT}${url}`;

  // Set a default header
  const finalHeaders = { ...opts.headers };
  finalHeaders['Content-type'] = 'application/json';

  // Ensure headers are sent to fetch
  opts.headers = finalHeaders;

  return useFetch(finalUrl, opts, ...rest);
}
export { useApi };
