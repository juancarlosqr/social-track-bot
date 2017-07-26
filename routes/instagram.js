var express = require('express')
var router = express.Router()

var firebase = require('../utils/firebase')
var instagram = require('../utils/instagram')

router.get('/auth', function(req, res, next) {
  if (req.query.code) {
    instagram.token(req.query.code, req.query.id)
      .then(response => {
        firebase.ref(process.env.FIREBASE_URL_SESSION + '/' + req.query.id).set({
          token: response.access_token
        })
        res.redirect('/')
      })
  } else {
    res.redirect('/')
  }
})

router.get('/self', function(req, res, next) {
  const token = req.get('Authorization')
  if (token) {
    instagram.get('users/self', token)
      .then(response => {
        res.json(response)
      })
  } else {
    res.redirect('/')
  }
})

module.exports = router
