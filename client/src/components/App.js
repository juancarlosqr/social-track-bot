import React, { Component } from 'react'
import {
  Button,
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
import api from '../utils/api'

const SignIn = () => (
  <Form size='large'>
    <Form.Input
      fluid
      icon='user'
      iconPosition='left'
      placeholder='Correo electrónico'
    />
    <Form.Input
      fluid
      icon='lock'
      iconPosition='left'
      placeholder='Contraseña'
      type='password'
    />
    <Button color='teal' fluid size='huge'>
      Iniciar sesi&oacute;n
      <Icon name='right arrow' />
    </Button>
  </Form>
)

const SignUp = () => (
  <Form size='large'>
    <Form.Input
      fluid
      icon='user'
      iconPosition='left'
      placeholder='Correo electrónico'
    />
    <Form.Input
      fluid
      icon='lock'
      iconPosition='left'
      placeholder='Contraseña'
      type='password'
    />
    <Form.Input
      fluid
      icon='lock'
      iconPosition='left'
      placeholder='Confirmar Contraseña'
      type='password'
    />
    <Button color='teal' fluid size='huge'>
      Registrarme
      <Icon name='right arrow' />
    </Button>
  </Form>
)

const panes = [
  { menuItem: 'Iniciar sesión', render: () => <Tab.Pane><SignIn /></Tab.Pane> },
  { menuItem: 'Registro', render: () => <Tab.Pane><SignUp /></Tab.Pane> },
]

const TabExampleSecondaryPointing = () => (
  <Tab panes={panes} />
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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      ok: false,
    }
  }
  componentDidMount() {
    api.ok()
      .then(data => {
        if (data.status === 'ok') {
          this.setState({loading: false, ok: true})
        } else {
          this.setState({loading: false, ok: false})
        }
      })
  }
  renderMain() {
    const { loading, ok } = this.state
    if (loading) return <Loading />
    return (ok) ? <TabExampleSecondaryPointing /> : <NotOk />
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

export default App
