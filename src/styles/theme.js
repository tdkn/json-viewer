import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
  primary: { main: '#263238' },
  secondary: { main: '#00E676' }
}
const themeName = 'Outer Space Spring Green Raccoon'

export default createMuiTheme({
  palette,
  themeName,
  typography: {
    useNextVariants: true,
    button: {
      textTransform: 'none'
    }
  }
})
