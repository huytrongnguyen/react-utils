import String from './../core/string'

class Xhr {
  constructor() {
    this.xhr = new XMLHttpRequest()
  }

  async ajax(url, method, params) {
    try {
      const response = await this.promise({ url, method, params })
      if (response.Error) {
        console.error(response.Error.Type, ':', response.Error.Message)
        if (response.Error.Trace) {
          console.error(response.Error.Trace)
        }
        // TODO: show a toast message
        return null
      }
      return response
    } catch (e) {
      console.error(e)
      return null
    }
  }

  promise(settings) {
    return new Promise((resolve, reject) => {
      this.request(settings, (err, res) => {
        if (err) {
          reject(err)
          return
        }
        resolve(res)
      })
    })
  }

  request(settings, done) {
    let xhr = this.xhr
    let { url, method, params } = settings
    if (method === 'get' && params !== null) {
      url = `${url}?${String.toQueryString(params)}`
    }
    xhr.open(method, url, true)
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        try {
          done(null, JSON.parse(xhr.responseText))
        } catch (e) {
          done(null, xhr.responseText)
        }

      }
    }
    xhr.send(params !== null ? JSON.stringify(params) : null)
  }
}

export default new Xhr