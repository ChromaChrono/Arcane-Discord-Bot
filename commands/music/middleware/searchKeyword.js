/* eslint-disable node/no-unsupported-features/es-syntax */
const InputError = require('../../../utils/customErrorHandler');

require('dotenv').config();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async input => {
  const results = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${input}&key=${process.env.API_KEY_YOUTUBE}`,
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.error) {
        throw new Error(
          `The daily quota for search requests has been reached. You should still be able to use video links to play your music. I'm sorry for the inconvenience`,
        );
      }
      return data;
    })
    .catch(err => {
      throw new InputError(err.message, true);
    });

  return `https://www.youtube.com/watch?v=${results.items[0].id.videoId}`;
};
