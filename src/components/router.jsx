import React, { Component } from 'react'
import { List } from './../core/collection'

export class Route extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return null
  }
}

export class Router extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.component) {
      console.error('component props should not be null')
    }
    this.createTransitionManager()
    return this.props.component
  }

  createTransitionManager() {
    const { children } = this.props
    List.of(children).each(route => {
      if (route.props && route.props.path && route.props.component) {
        console.log(`path = ${route.props.path}, component = ${route.props.component}`)
        console.log(route)
      }
    })
  }
}