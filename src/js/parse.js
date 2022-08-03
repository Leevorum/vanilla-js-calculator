export default function parse(str) {
  return Function(` return (${str})`)();
}
