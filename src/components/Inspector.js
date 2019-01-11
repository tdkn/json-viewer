import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import stores from '../stores'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import CustomInput from './CustomInput'
import WatcherTable from './WatcherTable'

function TabContainer(props) {
  const isVisible = props.tabIndex === props.index
  return isVisible ? (
    <div style={{ display: 'flex', height: '100%' }}>{props.children}</div>
  ) : null
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  tabIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  grow: {
    flexGrow: 1
  }
})

class Inspector extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  state = {
    tabIndex: 0
  }

  handleChange = (event, value) => {
    this.setState({ tabIndex: value })
  }

  onEnter = value => {
    console.log('onEnter', value)
    this.props.watcherStore.addKey(value)
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense" disableGutters>
            <Tabs
              value={this.state.tabIndex}
              onChange={this.handleChange}
              className={classes.grow}
            >
              <Tab label="Path Watcher" />
            </Tabs>
            <CustomInput onEnter={this.onEnter} />
          </Toolbar>
        </AppBar>
        <TabContainer tabIndex={this.state.tabIndex} index={0}>
          <WatcherTable />
        </TabContainer>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  inject(stores => ({
    watcherStore: stores.watcherStore
  })),
  observer
)(Inspector)
