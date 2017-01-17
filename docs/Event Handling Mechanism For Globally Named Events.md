# EVENT HANDLING MECHANISM FOR GLOBALLY NAMED EVENTS

## Usage

### Subcribe to a given event name

```javascript
PubSub.subcribe('sessionChange', (response) => {
  // do something with response
})
```

Note that you can subcrible multiple callback functions to a given event name. You need to pass the same event name and function to unsubscribe that you passed into subscribe.

### Remove subcribers

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

### Fire the named event

The first argument is the name, the rest of the arguments are passed to the subscribers.

```javascript
PubSub.publish('sessionChange', response)
```