import { useState } from "react";

const KEY = "shortly:recent";

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export default function useRecentLinks() {
  const [links, setLinks] = useState(read);

  const save = (next) => {
    setLinks(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const add = (item) =>
    save([item, ...links.filter((l) => l.id !== item.id)].slice(0, 8));
  const remove = (id) => save(links.filter((l) => l.id !== id));

  return { links, add, remove };
}
