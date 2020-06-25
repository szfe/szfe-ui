import React, { Component } from 'react'
import { run } from 'szfe-tools'

import View from '../View'
import Page from './Page'



export default class ErrorBoundary extends Component {
  static Page = Page
  static defaultProps = {
    fallback: (error, retry) => (
      <View className="szfe-error-boundary__view">
        <Page error={error} onRetry={retry} />
      </View>
    ),
  }

  state = {
    error: null,
  }

  componentDidCatch(error) {
    const { onError } = this.props

    run(onError, undefined, error)

    this.setState({
      error,
    })
  }

  retry = () => {
    this.setState({
      error: null,
    })
  }

  render() {
    const { children, fallback } = this.props
    const { error } = this.state

    return error ? run(fallback, undefined, error, this.retry) : children
  }
}
