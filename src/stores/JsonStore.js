import { types, onSnapshot } from 'mobx-state-tree'
import store from 'store'

const JsonStore = types
  .model('JsonStore', {
    text: types.optional(types.string, '')
  })
  .views(self => ({
    get json() {
      try {
        const json = JSON.parse(self.text)
        return JSON.stringify(json, null, 2)
      } catch {
        return 'Invalid JSON'
      }
    },
    get mode() {
      try {
        JSON.parse(self.text)
      } catch (e) {
        return ''
      }
      return 'application/json'
    }
  }))
  .actions(self => ({
    afterCreate() {
      const defaultText = JSON.stringify(require('../assets/hello.json'))
      self.text = store.get('text', defaultText)
    },
    setText(text) {
      self.text = text
      store.set('text', text)
    }
  }))

export default JsonStore
