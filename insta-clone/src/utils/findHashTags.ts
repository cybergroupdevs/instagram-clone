function findHashtags(searchText) {
    const regexp = /(\s|^)\#\w\w+\b/gm
    let result = searchText.match(regexp);
    if (result) {
        result = result.map(function(s){ return s.trim();});
        console.log(result);
        return result;
    } else {
        return [];
    }
}

export default findHashtags;