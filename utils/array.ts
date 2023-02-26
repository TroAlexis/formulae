export const getLastIndex = (array: any[]): number => {
  return array.length - 1;
};

export const getLast = <T extends any[]>(array: T): T[number] => {
  const lastIndex = getLastIndex(array);
  return array[lastIndex];
};

export const sliceExceptLast = <T extends any[]>(array: T) => {
  const lastIndex = getLastIndex(array);
  return array.slice(0, lastIndex);
};

export const spliceLast = <T extends any[], K extends T[number]>(
  array: T,
  el: K
) => {
  const lastIndex = getLastIndex(array);
  return array.splice(lastIndex, 1, el);
};
