export const calcOffset = (element: HTMLElement | null) => {
  let top = 0;
  do {
    top += element?.offsetTop || 0;
    // @ts-ignore
    element = element.offsetParent;
  } while (element);
  return top;
};
