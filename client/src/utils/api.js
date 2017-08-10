import axios from 'axios'

const base = (process.env.NODE_ENV !== 'production')
  ? '//localhost:8000/'
  : '//social-track-bot.herokuapp.com/'

const api = {
  ok: () => {
    return axios.get(base)
      .then(response => (response.data))
      .catch(handleError)
  },
  getUser: (token) => {
    return axios.get(`${ base }instagram/self`, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => (response.data))
      .catch(handleError)
  }
}

const handleError = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  console.log(error.config)

  return {status: false}
}

export default api
