export const wait = (time: number) => {
  return new Promise((accept) => setTimeout(accept, time));
};
