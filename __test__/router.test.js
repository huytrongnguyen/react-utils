import 'babel-polyfill'
import React from 'react'
import renderer from 'react-test-renderer'
import { Router, Route } from './../src/index'

test('render Router', () => {
  const Layout = <section id="layout" />,
        Home = <section id="home" />,
        About = <section id="about" />,
        component = renderer.create(
          <Router component={Layout}>
            <Route path="*" component={Home} />
            <Route path="about" component={About} />
          </Router>
        ).toJSON()
  console.log(component)
})