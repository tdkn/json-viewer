import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import stores from '../stores'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Cancel'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { ObjectInspector } from 'react-inspector'
import _ from 'lodash'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    overflowX: 'auto',
    overflowY: 'auto'
  },
  table: {
    minWidth: 700
  },
  head: {
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0
  },
  cell: {
    fontFamily: 'monospace'
  }
})

class WatcherTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  get json() {
    try {
      return JSON.parse(this.props.jsonStore.json)
    } catch {
      return {}
    }
  }

  createKeys = () => {
    return this.props.watcherStore.keys.map(key => {
      return { key, value: _.get(this.json, key, undefined) }
    })
  }

  handleClickRemove = index => () => {
    this.props.watcherStore.removeKeyAt(index)
  }

  render() {
    const { classes, watcherStore } = this.props
    const keys = this.createKeys()

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>Key</TableCell>
              <TableCell className={classes.head}>Value</TableCell>
              <TableCell className={classes.head} align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {keys.map(({ key, value }, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.cell}
                  >
                    {key}
                  </TableCell>
                  <TableCell>
                    <ObjectInspector data={value} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      className={classes.iconButton}
                      onClick={this.handleClickRemove(idx)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default compose(
  withStyles(styles),
  inject(stores => ({
    watcherStore: stores.watcherStore,
    jsonStore: stores.jsonStore
  })),
  observer
)(WatcherTable)
