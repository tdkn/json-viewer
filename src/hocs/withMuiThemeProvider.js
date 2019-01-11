import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'

const withMuiThemeProvider = theme => Component =>
  function WithMuiThemeProvider(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <Component {...props} />
      </MuiThemeProvider>
    )
  }

export default withMuiThemeProvider
