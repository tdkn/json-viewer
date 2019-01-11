import { types, onSnapshot } from 'mobx-state-tree'
import PaneStore from './PaneStore'
import JsonStore from './JsonStore'
import WatcherStore from './WatcherStore'

const stores = {
  paneStore: PaneStore.create(),
  jsonStore: JsonStore.create(),
  watcherStore: WatcherStore.create()
}

export default stores
