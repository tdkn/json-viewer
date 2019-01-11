import { types, onSnapshot } from 'mobx-state-tree'
import store from 'store'

const PaneStore = types
  .model('PaneStore', {
    mainPaneSize: types.union(
      types.optional(types.string, '50%'),
      types.number
    ),
    viewerPaneSize: types.union(
      types.optional(types.string, '50%'),
      types.number
    )
  })
  .actions(self => ({
    afterCreate() {
      self.mainPaneSize = store.get(`main_pane_size`, '50%')
      self.viewerPaneSize = store.get(`viewer_pane_size`, '50%')
    },
    setMainPaneSize(size) {
      store.set(`main_pane_size`, size)
    },
    setViewerPaneSize(size) {
      store.set(`viewer_pane_size`, size)
    },
    reset() {
      self.mainPaneSize = '50%'
      self.viewerPaneSize = '50%'
      store.set(`main_pane_size`, '50%')
      store.set(`viewer_pane_size`, '50%')
    }
  }))

export default PaneStore
