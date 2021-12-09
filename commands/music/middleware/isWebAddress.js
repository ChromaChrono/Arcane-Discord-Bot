module.exports = string => {
  const regexForAddress =
    /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return regexForAddress.test(string);
};
