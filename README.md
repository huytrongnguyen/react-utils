# React Lazy

[![npm version](http://img.shields.io/npm/v/rc-lazy.svg?style=flat-square)](http://npmjs.org/package/rc-lazy)
[![Travis build status](https://travis-ci.org/huytrongnguyen/react-utils.svg)](https://travis-ci.org/huytrongnguyen/react-utils)
[![npm download](https://img.shields.io/npm/dm/rc-lazy.svg?style=flat-square)](https://npmjs.org/package/rc-lazy)
[![npm license](https://img.shields.io/npm/l/rc-lazy.svg)](https://npmjs.org/package/rc-lazy)

Utility Components and Services for React

## Installation

You'll need both React and React Lazy:

[![rc-lazy](https://nodei.co/npm/rc-lazy.png?downloadRank=true&downloads=true)](https://npmjs.org/package/rc-lazy)

## Features

### Building Data-Driven React Application

 * Setup network layer throught ```Store.BASE_URL```
 * Setup the endpoint to make an AJAX request in ```dataContainer``` decorator
 * The response data will be pushed to the state of the component

```js
import React, { Component } from 'react'
import { Xhr, MutationType, store } from 'rc-lazy'

Xhr.BASE_URL = '/api'

@store({
  endpoint: {
    name: 'system',
    initialVariables: () => {
      return {
        page: 1,
        size: 20
      }
    }
  }
})
class MyComponent extends Component {
  render() {
    const { TestData } = this.props.store.data
    return <div>
      <p>{JSON.stringify(TestData)}</p>
    </div>;
  }
}

export default MyComponent
```

### Storing Data Locally In The Browser

 * Saving cache

```js
import { Cache } from 'rc-lazy'

Cache.set('token', { tokenId: 1, accessToken: 'abcdef' })
```

 * Retrieving cache

```js
const token = Cache.get('token') // token = { tokenId: 1, accessToken: 'abcdef' }
```

 * Flushing cache

```js
Cache.remove('token')
Cache.remove() // remove all cached data
```

### Event Handling Mechanism For Globally Named Events

 * Subcribe to a given event name

```js
PubSub.subcribe('sessionChange', (response) => {
  // do something with response
})
```

 * Remove subcribers

```js
const onSessionChange = (response) { /* do something with response */ }

PubSub.subcribe('sessionChange', onSessionChange)

// sometime later in your code you dont want to get notified anymore
PubSub.unsubscribe('sessionChange', onSessionChange)

// one you want to remove all subcribers for named event, just call ```clear```:
PubSub.clear('sessionChange')
```

 * Fire the named event

```js
PubSub.publish('sessionChange', response)
```

## License

rc-lazy is released under the MIT license.