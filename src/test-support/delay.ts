export const delay = async (duration: number) =>
  await new Promise<void>((accept) => setTimeout(accept, duration));
