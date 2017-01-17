import React, { Component } from 'react'
import { List } from './../core/collection'

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
    this.routes = {}
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
    if (!component) {
      console.error('component props should not be null')
    }
    let { route } = this.state,
        child = this.routes['*']
    route = route.toLowerCase()
    if (route && this.routes[route]) {
      child = this.routes[route]
    }
    return React.createElement(component, {}, React.createElement(child, {}, null))
  }

  createTransitionManager() {
    const { children } = this.props
    List.of(children).each(route => {
      if (route.props && route.props.path && route.props.component) {
        this.routes[route.props.path] = route.props.component
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
    let link = to || ''
    let cls = className
    if (link === route && activeClassName) {
      cls += ' ' + activeClassName
    }
    return <a href={`#${link}`} className={cls}>{children}</a>
  }
}