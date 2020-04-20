function findMentions(searchText) {
  const regexp = /\s([@][\w_-]+)/g;
  let result = searchText.match(regexp);
  if (result) {
    result = result.map(function (s) {
      return s.trim();
    });
    return result;
  } else {
    return [];
  }
}

export default findMentions;
