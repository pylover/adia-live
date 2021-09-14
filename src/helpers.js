export function leftPad(num, places, char) {
  return String(num).padStart(places, char);
}

export function pureFilename(string) {
    return string.trim().toLowerCase().replace(/\s/g, '-');
}
