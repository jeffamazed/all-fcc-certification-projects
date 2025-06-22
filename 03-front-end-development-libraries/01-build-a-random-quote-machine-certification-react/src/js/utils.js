// utility functions
function quoteUrlGenerator(quote, author, type) {
  const text = encodeURIComponent(`${quote} ${author}`);
  if (type === "twitter") {
    return `https://twitter.com/intent/tweet?text=${text}`;
  } else if (type === "tumblr") {
    // Separate encoding for quote and author for tumblr
    const encodedQuote = encodeURIComponent(quote);
    const encodedAuthor = encodeURIComponent(author);
    return `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,inspiration&caption=${encodedAuthor}&content=${encodedQuote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
  }
  return "";
}

function generateRandQuote(list) {
  if (!list) return null;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

export { quoteUrlGenerator, generateRandQuote };
