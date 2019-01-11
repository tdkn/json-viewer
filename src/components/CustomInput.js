import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/AddBox'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginRight: 5
  },
  input: {
    flex: 1
  },
  iconButton: {
    padding: 5
  },
  divider: {
    width: 1,
    height: 28,
    margin: '4px 2px'
  }
}

class CustomiInput extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onEnter: PropTypes.func.isRequired
  }

  state = {
    value: ''
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.complete()
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleClick = event => {
    this.complete()
  }

  complete = () => {
    this.props.onEnter(this.state.value)
    this.setState({ value: '' })
  }

  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root} elevation={1}>
        <IconButton className={classes.iconButton} aria-label="Menu" disabled>
          <VisibilityIcon />
        </IconButton>
        <InputBase
          value={this.state.value}
          className={classes.input}
          placeholder="path"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <Tooltip title="Add Watcher Key">
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="Add"
            onClick={this.handleClick}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    )
  }
}

export default withStyles(styles)(CustomiInput)
