import React from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import stores from '../stores'
import SplitPane from 'react-split-pane'
import { Controlled as CodeMirror } from 'react-codemirror2'
import store from 'store'
import Inspector from './Inspector'

import 'codemirror/addon/display/autorefresh.js'
import 'codemirror/mode/javascript/javascript.js'

class Viewer extends React.Component {
  handleChangeText = event => {
    this.props.jsonStore.setText(event.target.value)
  }

  render() {
    const { paneStore, jsonStore } = this.props

    return (
      <div className="Viewer">
        <SplitPane
          split="horizontal"
          size={paneStore.mainPaneSize}
          defaultSize={paneStore.mainPaneSize}
          onChange={paneStore.setMainPaneSize}
          pane2Style={{ display: 'flex' }}
        >
          <SplitPane
            split="vertical"
            size={paneStore.viewerPaneSize}
            defaultSize={paneStore.viewerPaneSize}
            onChange={paneStore.setViewerPaneSize}
            pane2Style={{ display: 'flex', width: '50%' }}
          >
            <textarea
              className="text"
              spellCheck="false"
              value={jsonStore.text}
              onChange={this.handleChangeText}
            />
            <CodeMirror
              value={jsonStore.json}
              options={{
                lineNumbers: true,
                readOnly: true,
                mode: jsonStore.mode
              }}
            />
          </SplitPane>
          <Inspector />
        </SplitPane>
      </div>
    )
  }
}

export default compose(
  inject(stores => ({
    paneStore: stores.paneStore,
    jsonStore: stores.jsonStore
  })),
  observer
)(Viewer)
