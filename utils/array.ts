export const getLast = <T extends any[]>(array: T): T[number] => {
  return array[array.length - 1];
};

export const sliceExceptLast = <T extends any[]>(array: T) => {
  return array.slice(0, array.length - 1);
};

export const spliceLast = <T extends any[], K extends T[number]>(
  array: T,
  el: K
) => {
  return array.splice(array.length - 1, 1, el);
};
