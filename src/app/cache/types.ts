export type CachedValue = {
  result: string[];
  timestamp: number;
};

export type Cache = {
  [key: string]: CachedValue;
};
