import React, { Component } from 'react'
import api from '../utils/api'
import firebase from '../utils/firebase'
// components
import Landing from './Landing'

const Home = () => (
  <p>Hi!</p>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      ok: false,
      auth: false,
      user: null,
      error: null,
    }
    this.handleError = this.handleError.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleError(error) {
    this.setState({error: error.message, loading: false})
    console.log('error', error)
  }

  handleSignUp(email, password) {
    this.setState({error: null, loading: true})
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(this.handleError)
  }

  handleSignIn(email, password) {
    this.setState({error: null, loading: true})
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(this.handleError)
  }

  handleSignOut() {
    this.setState({error: null, loading: true})
    firebase.auth().signOut()
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({auth: (user), user, loading: false})
      console.log('user', user)
    })
    api.ok()
      .then(data => {
        if (data.status === 'ok') {
          this.setState({loading: false, ok: true})
        } else {
          this.setState({loading: false, ok: false})
        }
      })
  }

  render() {
    const { handleSignUp, handleSignIn } = this
    const actions = {
      handleSignUp,
      handleSignIn
    }
    return (
      <div>
        {(this.state.auth) ? <Home /> : <Landing
          {...this.state}
          actions={actions} />
        }
      </div>
    )
  }
}

export default App
