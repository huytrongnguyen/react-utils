This project is divided in multiple parts

# LazyContainer

As we know, React has no networking/AJAX features. You can see this article: [http://andrewhfarmer.com/react-ajax-best-practices/](http://andrewhfarmer.com/react-ajax-best-practices/)
I like Relay but it only works with GraphQL. Then I make a small library based on Relay concept but it will work with RESTful backends.

## Installation

You'll need both React and React Utils:

`npm install --save react rc-lazy`


## LazyContainer

Library for React and RESTful backends


### Usage

Create a React component extends from LazyContainer:

```javascript
import React from 'react'
import { LazyContainer, MutationType, Store } from 'rc-lazy'

class MyComponent extends LazyContainer {
  constructor(props) {
    super(props)
    Store.BASE_URL = '/api'
    this.state = {
      TestData: []
    }
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

You need to setup the endpoint (and BASE_URL if needed) to make an AJAX request to ```http://<IP Server>:<Port>/api/system``` to get the data.

The response data will be pushed to state so UI will change whenever state changes.

In case we want to make a POST request to ```http://<IP Server>:<Port>/api/system/login```, add the mutations object into defaultProps:

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

Then you can call ```login``` as a function and add the record, success function and failure function like this:

```javascript
this.props.lazy.login({
  record: {
    Id: "my_id",
    Password: "my_password"
  },
  success: response => {
    console.log(response)
  },
  failure: response => {
    console.log(response)
  }
})
```

In case we want to add some query params, just change the endpoint:

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

And one more thing, if you want to do something with the response data before it's pushed to state, just add the resolve function like below:

```javascript
MyComponent.defaultProps = {
  endpoint: 'master-data/card',
  resolve: response => {
    response.groups = Seq.groupBy(response.Cards, card => card.Type)
    response.keys = Seq.keySet(response.groups)
    response.active = response.keys[0]
    return response
  }
}
```

### License

MIT