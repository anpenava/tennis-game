function pluralizeIfHasCount (count, word, suffix = 's') {
  if (count == 0) return "didn't score";
  return `scored ${count} ${word}${count !== 1 ? suffix : ''}`;
}

// TODO improve suffix

module.exports = pluralizeIfHasCount;