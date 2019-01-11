import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import stores from '../stores'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ResetPaneIcon from '@material-ui/icons/VerticalAlignCenter'

const styles = {
  root: {
    flexGrow: 0
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12
  }
}

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  handleResetView = () => {
    this.props.paneStore.reset()
    // document.location.reload()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense" disableGutters>
            <Typography
              align="center"
              variant="h6"
              color="inherit"
              className={classes.grow}
            >
              JSON Viewer
            </Typography>
            {/*
            <Tooltip title="Reset Pane Size">
              <IconButton onClick={this.handleResetView} color="inherit">
                <ResetPaneIcon />
              </IconButton>
            </Tooltip>
            */}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  inject(stores => ({
    paneStore: stores.paneStore
  })),
  observer
)(Header)
