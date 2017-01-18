import React, { Component } from 'react'
import { List } from './../core/collection'
import { routes } from './../decorators/route'

export class Route extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const component = this.props.component
    if (!component) {
      console.error('component props should not be null')
    }
    return new component()
  }
}

export class Router extends Component {
  constructor(props) {
    super(props)
    this.state = { route: window.location.hash.substring(1) }
    this.createTransitionManager()
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState(() => ({ route: window.location.hash.substring(1) }))
    })
  }

  render() {
    const component = this.props.component
    let { route } = this.state,
        child = routes['*']
    route = route.toLowerCase()
    if (route && routes[route]) {
      child = routes[route]
    }
    return React.createElement(component || 'div', {}, React.createElement(child, {}, null))
  }

  createTransitionManager() {
    const { children } = this.props
    List.of(children).each(route => {
      if (route.props && route.props.path && route.props.component) {
        routes[route.props.path] = route.props.component
      }
    })
  }
}

export class Link extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const route = window.location.hash.substring(1),
          { to, className, activeClassName, children } = this.props

    let link = to || '',
        cls = className

    if (link === route && activeClassName) {
      cls += ' ' + activeClassName
    }

    return <a href={`#${link}`} className={cls}>{children}</a>
  }
}