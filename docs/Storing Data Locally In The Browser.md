# A KEY-VALUE STORE DATABASE TO STORE DATA LOCALLY IN THE BROWSER

## Usage

### Saving cache

```javascript
import { Cache } from 'rc-lazy'

// API
Cache.set(key, value)

// example
Cache.set('token', { tokenId: 1, accessToken: 'abcdef' })
```

### Retrieving cache

```javascript
// API
Cache.get(key)

// example
const token = Cache.get('token') // token = { tokenId: 1, accessToken: 'abcdef' }
```

### Flushing cache

```javascript
// API
Cache.remove(key)

// example
Cache.remove('token')
Cache.remove() // remove all cached data
```