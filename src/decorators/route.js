export const routes = {}

const route = (path) => {
  return (target) => {
    routes[path] = target
  }
}

export default route