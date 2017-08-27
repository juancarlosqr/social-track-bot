import React, { Component } from 'react'
import {
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Tab,
} from 'semantic-ui-react'
import logo from '../images/bot.svg'

const SignIn = ({handleSignIn, handleInput}) => (
  <Form size='large' onSubmit={handleSignIn}>
    <Form.Input
      onChange={handleInput}
      name='email'
      fluid
      icon='user'
      iconPosition='left'
      placeholder='Correo electrónico'
    />
    <Form.Input
      onChange={handleInput}
      name='password'
      fluid
      icon='lock'
      iconPosition='left'
      placeholder='Contraseña'
      type='password'
    />
    <Form.Button color='teal' fluid size='huge'>
      Iniciar sesi&oacuten
      <Icon name='right arrow' />
    </Form.Button>
  </Form>
)

const SignUp = ({handleSignUp, handleInput}) => (
  <Form size='large' onSubmit={handleSignUp}>
    <Form.Input
      onChange={handleInput}
      name='email'
      fluid
      icon='user'
      iconPosition='left'
      placeholder='Correo electrónico'
    />
    <Form.Input
      onChange={handleInput}
      name='password'
      fluid
      icon='lock'
      iconPosition='left'
      placeholder='Contraseña'
      type='password'
    />
    <Form.Input
      onChange={handleInput}
      name='verification'
      fluid
      icon='lock'
      iconPosition='left'
      placeholder='Confirmar Contraseña'
      type='password'
    />
    <Form.Button color='teal' fluid size='huge'>
      Registrarme
      <Icon name='right arrow' />
    </Form.Button>
  </Form>
)

const NotOk = () => (
  <div>
    <p>Oh que pena! tenemos problemas en este momentos</p>
    <p>Mantegamos esto entre nosotros... Regresa luego</p>
  </div>
)

const Loading = () => (
  <p>Un momento que estaba durmiendo...</p>
)

const TabContainer = ({panes}) => (
  <Tab panes={panes} />
)

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      verification: '',
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.panes = [
      { menuItem: 'Iniciar sesión', render: () => <Tab.Pane>
        <SignIn handleSignIn={this.handleSignIn} handleInput={this.handleInput} />
      </Tab.Pane> },
      { menuItem: 'Registro', render: () => <Tab.Pane>
        <SignUp handleSignUp={this.handleSignUp} handleInput={this.handleInput} />
      </Tab.Pane> },
    ]
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSignUp(e) {
    const { email, password, verification } = this.state
    e.preventDefault()
    if (password === verification) {
      this.props.actions.handleSignUp(email, password)
      this.setState({username: '', password: '', verification: ''})
    }
  }

  handleSignIn(e) {
    e.preventDefault()
    this.props.actions.handleSignIn(this.state.email, this.state.password)
    this.setState({username: '', password: ''})
  }

  renderMain() {
    const { loading, ok } = this.props
    if (loading) return <Loading />
    return (ok) ? <TabContainer panes={this.panes} /> : <NotOk />
  }

  render() {
    return (
      <div>
        <Segment
          textAlign='center'
          style={{ padding: '3em 0em 2em' }}
          vertical
        >
          <Container text>
            <Image src={logo} size='small' centered
              style={{ marginTop: '0.2em' }}
            />
            <Header
              content='Social Track Bot'
              color='teal'
              style={{ fontSize: '3em', fontWeight: 'bold', marginBottom: 0, marginTop: '0.5em' }}
            />
            <Header
              as='h2'
              content='Un Bot en el negocio de monitorear redes sociales'
              style={{ fontSize: '1.5em', fontWeight: 'normal', marginBottom: '1.2em' }}
            />
            <Grid
              textAlign='center'
              style={{ height: '100%' }}
              verticalAlign='middle'
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                {this.renderMain()}
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}

export default Landing
