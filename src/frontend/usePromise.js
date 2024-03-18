import { useState } from "react";

export function usePromise(func) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function exec() {
    setLoading(true);
    func()
      .then(setData)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }

  return { data, error, loading, exec };
}
