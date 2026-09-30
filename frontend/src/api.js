const API = import.meta.env.VITE_API_URL || ""; // empty = same origin (Vite proxy in dev)

async function request(path, options) {
  let res;
  try {
    res = await fetch(API + path, options);
  } catch {
    throw new Error(
      "Can't reach the server. Start it with npm run dev in the backend folder.",
    );
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status}).`);
  return data;
}

export const createShortUrl = (url) =>
  request("/url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

export const getAnalytics = (id) =>
  request(`/url/analytics/${encodeURIComponent(id)}`);
