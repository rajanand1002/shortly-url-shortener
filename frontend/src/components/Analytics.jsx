import { useEffect, useMemo, useState } from "react";
import { getAnalytics } from "../api";

const ID_PATTERN = /^[A-Za-z0-9]{8}$/;

// Clicks per day for the last 7 days
function lastSevenDays(visits) {
  const days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  return days.map((day) => ({
    day,
    count: visits.filter(
      (v) => new Date(v.timestamp).toDateString() === day.toDateString(),
    ).length,
  }));
}

export default function Analytics({ target }) {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState({ text: "", type: "" });

  const load = async (id) => {
    setData(null);
    if (!ID_PATTERN.test(id)) {
      return setStatus({
        text: "The ID must be exactly 8 letters or numbers.",
        type: "err",
      });
    }
    setStatus({ text: "Loading…", type: "" });
    try {
      setData(await getAnalytics(id));
      setStatus({ text: "", type: "" });
    } catch (err) {
      setStatus({ text: err.message, type: "err" });
    }
  };

  // Runs whenever the user picks a link (or creates a new one)
  useEffect(() => {
    if (target?.id) {
      setInput(target.id);
      load(target.id);
    }
  }, [target]);

  const chart = useMemo(
    () => (data ? lastSevenDays(data.analytics) : []),
    [data],
  );
  const max = Math.max(...chart.map((c) => c.count), 1);
  const latest = data ? [...data.analytics].reverse().slice(0, 5) : [];

  return (
    <section className="card">
      <h2>Click analytics</h2>
      <p className="sub">
        Enter the 8-character ID at the end of a short link.
      </p>

      <form
        className="lookup"
        onSubmit={(e) => {
          e.preventDefault();
          load(input.trim());
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. aB3xK9pQ"
          maxLength={8}
          aria-label="Short link ID"
          autoComplete="off"
          required
        />
        <button className="ghost">Show clicks</button>
      </form>

      <div className={"msg " + status.type} role="status">
        {status.text}
      </div>

      {data && (
        <div>
          <div className="total">{data.totalClicks}</div>
          <div className="sub" style={{ margin: 0 }}>
            total clicks
          </div>

          <div className="chart">
            {chart.map((c) => (
              <div
                key={c.day.toISOString()}
                style={{ height: `${(c.count / max) * 100}%` }}
                title={`${c.count} clicks on ${c.day.toLocaleDateString()}`}
              />
            ))}
          </div>
          <div className="days">
            {chart.map((c) => (
              <span key={c.day.toISOString()}>
                {c.day.toLocaleDateString(undefined, { weekday: "short" })}
              </span>
            ))}
          </div>

          <p className="dest">
            Goes to {data.redirectURL}
            {data.createdAt &&
              ` · created ${new Date(data.createdAt).toLocaleDateString()}`}
          </p>

          <div className="visits">
            <h3>Latest visits</h3>
            <ul className="list">
              {latest.length === 0 ? (
                <li>No visits yet. Open your short link to test it.</li>
              ) : (
                latest.map((v) => (
                  <li key={v.timestamp}>
                    {new Date(v.timestamp).toLocaleString()}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
