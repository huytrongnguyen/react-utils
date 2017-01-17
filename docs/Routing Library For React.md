# Routing Library For React

The same behavior with ```react-router``` but simpler and it will be upgraded in next version (^_^)

## Usage

### Route Configuration

A route configuration is a set of instructions that tell a router how to match the URL with the component.

```javascript
import React, { Component } from 'react'
import { Router, Route } from 'rc-lazy'
import Layout from './layout'
import Dashboard from './dashboard'
import About from './about'

export default class Routes extends Component {
  render() {
    return <Router component={Layout}>
      <Route path="*" component={Dashboard} />
      <Route path="about" component={About} />
    </Router>
  }
}

render(<Routes />, document.getElementById('react-root'))
```

As configured, the application will know how to render:

URL      | Components
---------|-----------
`/`      | `Dashboard`
`/about` | `About`

You must use ```path="*"``` to specify a default page. Then you need to setup a component to act like a layout of the application throught ```component``` props in ```Router``` (see in below)

### Setup application

```javascript
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Xhr, Store } from 'rc-lazy'
import Routes from './routes'

render(<Routes />, document.getElementById('react-root'))
```

### Navigation

```javascript
import React, { Component } from 'react'
import { Link } from 'rc-lazy'

export default class Layout extends Component {
  render() {
    return <section>
      <nav className="navbar navbar-light bg-faded">
        <a href="javascript:void(0)" className="navbar-brand text-primary font-weight-bold">Administration</a>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active font-weight-bold">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="about" className="nav-link" activeClassName="active">About</Link>
          </li>
        </ul>
      </nav>
      <main>
        {this.props.children}
      </main>
    </section>
  }
}
```

```Link``` is the way to allow users to navigate around your application. Set the path to ```to``` props to navigate to the component that you defined in ```Router```. If ```to``` is missed, default page will be returned.