function capitalize(word) {
  if (!word === "") return;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default capitalize;
