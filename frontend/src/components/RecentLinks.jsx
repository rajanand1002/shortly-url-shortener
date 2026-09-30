import { copyText } from "../utils";

export default function RecentLinks({ links, onSelect, onRemove, toast }) {
  return (
    <section className="card">
      <h2>Your recent links</h2>
      <p className="sub">Saved in this browser only.</p>

      {links.length === 0 ? (
        <p className="empty">Links you create will show up here.</p>
      ) : (
        <ul className="list">
          {links.map((l) => (
            <li key={l.id}>
              <div className="info">
                <b>{l.id}</b>
                <small title={l.url}>{l.url}</small>
              </div>
              <div className="acts">
                <button className="ghost" onClick={() => onSelect(l.id)}>
                  Clicks
                </button>
                <button
                  className="ghost"
                  onClick={() => copyText(l.shortUrl, toast)}
                >
                  Copy
                </button>
                <button className="ghost" onClick={() => onRemove(l.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
