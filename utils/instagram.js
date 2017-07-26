const qs = require('qs')
const axios = require('axios')
const base = 'https://api.instagram.com/'

const instagramApi = {
  get: (url, token) => {
    return axios.get((`${ base }v1/${ url }?access_token=${ token }`))
      .then(response => (response.data))
      .catch(handleError)
  },
  token: (code, id) => {
    const params = {
      client_id: process.env.INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:8000/instagram/auth?id=' + id,
      code: code,
    }
    return axios.post(`${ base }oauth/access_token`, qs.stringify(params))
      .then(response => (response.data))
      .catch(handleError)
  }
}

const handleError = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
}

module.exports = instagramApi
