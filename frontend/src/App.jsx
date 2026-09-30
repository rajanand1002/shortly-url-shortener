import { useState } from "react";
import ShortenForm from "./components/ShortenForm";
import RecentLinks from "./components/RecentLinks";
import Analytics from "./components/Analytics";
import Toast from "./components/Toast";
import useRecentLinks from "./hooks/useRecentLinks";
import useToast from "./hooks/useToast";

export default function App() {
  const { links, add, remove } = useRecentLinks();
  const [toastText, toast] = useToast();
  const [target, setTarget] = useState(null); // { id, n } so re-clicking the same link reloads it

  const select = (id) => setTarget({ id, n: Date.now() });

  const handleCreated = (data) => {
    add({ id: data.id, url: data.redirectURL, shortUrl: data.shortUrl });
    select(data.id);
  };

  return (
    <div className="wrap">
      <header>
        <i /> Shortly
      </header>
      <h1>Long links in. Short links out.</h1>
      <p className="lead">
        Paste any web address to get a short link, then see how many people
        opened it and when.
      </p>

      <ShortenForm onCreated={handleCreated} toast={toast} />

      <div className="grid">
        <RecentLinks
          links={links}
          onSelect={select}
          onRemove={remove}
          toast={toast}
        />
        <Analytics target={target} />
      </div>

      <Toast text={toastText} />
    </div>
  );
}
