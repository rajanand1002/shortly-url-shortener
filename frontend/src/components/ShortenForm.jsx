import { useState } from "react";
import { createShortUrl } from "../api";
import { copyText } from "../utils";

export default function ShortenForm({ onCreated, toast }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const paste = async () => {
    try {
      setUrl((await navigator.clipboard.readText()).trim());
    } catch {
      toast("Paste blocked by the browser. Use Ctrl+V instead.");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError("");
    const value = url.trim();

    try {
      if (!/^https?:$/.test(new URL(value).protocol)) throw new Error();
    } catch {
      return setError(
        "Enter a full web address starting with http:// or https://",
      );
    }

    setLoading(true);
    try {
      const data = await createShortUrl(value);
      setResult(data);
      onCreated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="bar" onSubmit={submit} noValidate>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/a/very/long/address"
          aria-label="Web address to shorten"
          autoComplete="off"
          required
        />
        <button type="button" className="ghost" onClick={paste}>
          Paste
        </button>
        <button disabled={loading}>
          {loading ? "Shortening…" : "Shorten link"}
        </button>
      </form>

      <div className={"msg" + (error ? " err" : "")} role="status">
        {error}
      </div>

      {result && (
        <div className="result show">
          <a href={result.shortUrl} target="_blank" rel="noopener noreferrer">
            {result.shortUrl}
          </a>
          <button
            type="button"
            className="ghost"
            onClick={() => copyText(result.shortUrl, toast)}
          >
            Copy link
          </button>
        </div>
      )}
    </>
  );
}
