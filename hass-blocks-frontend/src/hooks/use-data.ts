import { useEffect, useState } from "react";

export const useData = <T>(collection: string) => {
  const key = `hass-blocks-${collection}`;

  const [data, setData] = useState<T[]>(
    JSON.parse(localStorage.getItem(key) ?? "[]")
  );

  const add = (value: T) => {
    setData((data) => [...data, value]);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, add] as const;
};
