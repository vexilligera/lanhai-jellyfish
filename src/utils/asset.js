const BASE = import.meta.env.BASE_URL;

export function mediaUrl(filename) {
  return `${BASE}media/${filename}`;
}
