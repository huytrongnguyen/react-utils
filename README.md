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

* Lazy Container
* dataContainer (separate to [rc-model](https://npmjs.org/package/rc-model) library)
* Cache
* PubSub

## LazyContainer

A JAVASCRIPT LIBRARY FOR BUILDING DATA-DRIVEN REACT APPLICATIONS

As we know, React has no networking/AJAX features. You can see this article: [http://andrewhfarmer.com/react-ajax-best-practices/](http://andrewhfarmer.com/react-ajax-best-practices/)
I like Relay but it only works with GraphQL. Then I make a small library based on Relay concept and mix it with Container Components and it works with RESTful backends.

![Alt](http://andrewhfarmer.com/react-ajax-best-practices/img/container-components.png "Container Components")
![Alt](http://andrewhfarmer.com/react-ajax-best-practices/img/relay.png "Relay")

It doesn't violate "separation of concerns" design principle since we do not have any real AJAX request in presentation component. Every AJAX request lives in container component called LazyContainer.
The response data will be pushed into the state so that UI can change whenever state change.

### Usage

#### Containers

Create a React component extends from LazyContainer:

```javascript
import React from 'react'
import { LazyContainer, MutationType, Store } from 'rc-lazy'

Store.BASE_URL = '/api'

class MyComponent extends LazyContainer {
  constructor(props) {
    super(props)
    this.state = { TestData: [] }
  }

  render() {
    const { TestData } = this.state
    return <div>
      <p>{JSON.stringify(TestData)}</p>
    </div>;
  }
}

MyComponent.defaultProps = {
  endpoint: 'system'
}

export default MyComponent
```

You can setup network layer throught Store.BASE_URL. In this case, when you setup ```Store.BASE_URL = '/api'```, every AJAX requests will call to ```http://<IP Server>:<Port>/api/```

You need to setup the endpoint to make an AJAX request to ```http://<IP Server>:<Port>/api/<endpoint>``` throught defaultProps:

```javascript
MyComponent.defaultProps = {
  endpoint: 'system'
}
```

The response data will be pushed to state so that UI can change whenever state changes.

In case you want to add some query params, just change the endpoint fragment:

```javascript
MyComponent.defaultProps = {
  endpoint: {
    name: 'system',
    initialVariables: () => {
      return {
        page: 1,
        size: 20
      }
    }
  }
}
```

If you want to do something with the response data before it's pushed to state, just add the resolve function like below:

```javascript
MyComponent.defaultProps = {
  endpoint: 'master-data/card',
  resolve: response => {
    // Do something with response before return
    return response
  }
}
```

#### Mutations

Add mutations fragment into defaultProps, type can be MutationType.POST, MutationType.PUT, MutationType.DELETE.

```javascript
MyComponent.defaultProps = {
  endpoint: 'system',
  mutations: {
    login: {
      type: MutationType.POST,
      path: 'security/login'
    }
  }
}
```

As you can see from above, we add ```login``` to mutations fragment as a POST request and it will call to ```http://<IP Server>:<Port>/api/security/login```
Then you can call ```login``` as a function and add the record, success function and failure function like this:
Here's an example of this mutation in use:

```javascript
  handleLogin() {
    this.props.lazy.login({
      record: {
        Id: "my_id",
        Password: "my_password"
      },
      success: response => {
        console.log(response)
      },
      failure: () => {
        // Do something when it's failure
      }
    })
  }
```

We pass an object as a parameter into login function with the format:

```javascript
{
  record:  { ... }, // data to be sent to the server
  success: response => { ... }, // a function to be called if the request succeeds.
  failure: response => { ... } // a function to be called if the request fails.
}
```

#### Handle when Ajax complete

You can register a handler to be called when Ajax requests complete (with an error):

```javascript
import { Xhr } from 'rc-lazy'

Xhr.ajaxComplete = () => {
  console.log('Ajax Complete')
}

Xhr.ajaxError = (error) => {
  console.error(error.type, ':', error.message)
  if (error.trace) {
    console.error(error.trace)
  }
  const notification = `<div class="alert alert-danger" role="alert">
    <strong>${error.type}!</strong> ${error.message}
  </div>`
  document.getElementById('notify').innerHTML = notification
  window.setTimeout(() => {
    document.getElementById('notify').innerHTML = ''
  }, 2000)
}
```

#### Use decorator instead of inheritance

Instead of inheritance from LazyContainer, now you can use dataContainer decorator. Everything you put to defaultProps before now you can put to decorator as below:

```javascript
import React, { Component } from 'react'
import { dataContainer, MutationType, Store } from 'rc-lazy'

Store.BASE_URL = '/api'

@dataContainer({
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
  constructor(props) {
    super(props)
    this.state = { TestData: [] }
  }

  render() {
    const { TestData } = this.state
    return <div>
      <p>{JSON.stringify(TestData)}</p>
    </div>;
  }
}

export default MyComponent
```

## Cache

A KEY-VALUE STORE DATABASE TO STORE DATA LOCALLY IN THE BROWSER

### Usage

#### Saving cache

```javascript
import { Cache } from 'rc-lazy'

// API
Cache.set(key, value)

// example
Cache.set('token', { tokenId: 1, accessToken: 'abcdef' })
```

#### Retrieving cache

```javascript
// API
Cache.get(key)

// example
const token = Cache.get('token') // token = { tokenId: 1, accessToken: 'abcdef' }
```

#### Flushing cache

```javascript
// API
Cache.remove(key)

// example
Cache.remove('token')
Cache.remove() // remove all cached data
```

## PubSub

EVENT HANDLING MECHANISM FOR GLOBALLY NAMED EVENTS

### Usage

#### Subcribe to a given event name

```javascript
PubSub.subcribe('sessionChange', (response) => {
  // do something with response
})
```

Note that you can subcrible multiple callback functions to a given event name. You need to pass the same event name and function to unsubscribe that you passed into subscribe.

#### Remove subcribers

```javascript
const onSessionChange = (response) { /* do something with response */ }

PubSub.subcribe('sessionChange', onSessionChange)

// sometime later in your code you dont want to get notified anymore
PubSub.unsubscribe('sessionChange', onSessionChange)
```

One you want to remove all subcribers for named event, just call ```clear```:

```javascript
PubSub.clear('sessionChange')
```

#### Fire the named event

The first argument is the name, the rest of the arguments are passed to the subscribers.

```javascript
PubSub.publish('sessionChange', response)
```


## License

rc-lazy is released under the MIT license.