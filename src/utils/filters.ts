export const SHARED_KEY = (request: Request) => {
  if (!import.meta.env.SHARED_KEY) {
    console.warn("SHARED_KEY not set, all requests will be allowed");
    return true;
  }
  const auth = request.headers.get("Authorization");

  if (!auth) return false;

  return auth === import.meta.env.SHARED_KEY;
};
