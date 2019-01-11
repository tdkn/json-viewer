import React from 'react'
import { Provider } from 'mobx-react'

const withProvider = stores => Component =>
  function WithProvider(props) {
    return (
      <Provider {...stores}>
        <Component {...props} />
      </Provider>
    )
  }

export default withProvider
