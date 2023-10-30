export function truncate(str: string): string {
  const prefix = str.slice(0, 6);
  const suffix = str.slice(-6);
  return `${prefix}...${suffix}`;
}
export function truncateTitle(str: string): string {
  // const arr = str.split(' ');
  // let resultString = '';
  // for (let s of arr) {
  //   console.log(s);
  //   if (resultString.length + s.length < 20)
  //     resultString = `${resultString} ${s}`;
  //   else break;
  // }
  return (
    str.substring(0, 7) + '...' + str.substring(str.length - 4, str.length)
  );
}
