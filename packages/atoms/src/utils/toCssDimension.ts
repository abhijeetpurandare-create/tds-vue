export function toCssDimension(width: string | number) {
  return width === undefined
    ? null
    : isNaN(width as number)
    ? width
    : width + "px";
}
