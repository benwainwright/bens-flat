export const queryFn = (url: string) => {
  return async () => {
    const isClient = typeof window !== "undefined"
    const baseUrl = isClient ? "" : "http://localhost:3000/"
    const response = await fetch(`${baseUrl}${url}`);
    return await response.json();
  }
}
