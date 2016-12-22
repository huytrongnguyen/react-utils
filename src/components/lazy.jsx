import React, { Component } from 'react'
import Store from './../data/store'

export default class LazyContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.relay = {}
    const { mutations, relay } = this.props
    if (mutations) {
      for (let mutationName in mutations) {
        relay[mutationName] = mutationFragment => this.commitUpdate(mutations[mutationName], mutationFragment)
      }
    }
  }

  async componentDidMount() {
    if (!this.props.fragment) {
      return;
    }
    const fragment = this.props.fragment
    const endpoint = fragment.name || fragment
    const params = fragment.initialVariables ? fragment.initialVariables() : null
    let response = await Store.fetch(endpoint, params)
    if (this.props.resolve) {
      response = this.props.resolve(response)
    }
    this.setState(response)
  }

  async commitUpdate(mutator, mutationFragment) {
    const endpoint = mutationFragment.path || mutator.path
    const response = await Store.mutate(endpoint, mutator.type, mutationFragment.record)
    if (response && mutationFragment.success) {
      mutationFragment.success(response)
    } else if (mutationFragment.failure) {
      mutationFragment.failure()
    }
  }
}