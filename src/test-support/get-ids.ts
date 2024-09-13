interface Entities {
  [key: string]: string | Entities;
}

export const getIds = (entities: Entities): string[] => {
  return Object.entries(entities).flatMap(([, value]) =>
    typeof value === "string" ? value : getIds(value)
  );
};
