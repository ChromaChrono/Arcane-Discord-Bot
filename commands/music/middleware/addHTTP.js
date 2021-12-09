module.exports = url => {
  httpRegex = /https?:\/\//;
  const httpInUrl = httpRegex.test(url);

  if (httpInUrl) {
    return url;
  } else {
    return `https://${url}`;
  }
};
