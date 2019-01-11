import { types, onSnapshot } from 'mobx-state-tree'
import store from 'store'

const WatcherStore = types
  .model('WatcherStore', {
    keys: types.array(types.string)
  })
  .actions(self => ({
    afterCreate() {
      self.keys = store.get('watch_keys', ['greetings[0].hello'])
    },
    addKey(key) {
      self.keys.push(key)
      store.set('watch_keys', self.keys)
    },
    removeKeyAt(index) {
      self.keys = self.keys.filter((key, idx) => idx !== index)
      store.set('watch_keys', self.keys)
    }
  }))

export default WatcherStore
