import { useCallback, useRef, useState } from "react";

export default function useToast() {
  const [text, setText] = useState("");
  const timer = useRef();

  const show = useCallback((message) => {
    setText(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setText(""), 1800);
  }, []);

  return [text, show];
}
