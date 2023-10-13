
export function truncate(str: string): string {
  const prefix = str.slice(0, 6);
  const suffix = str.slice(-6);
  return `${prefix}...${suffix}`;
}

