import React, { Suspense } from 'react'
import { Switch, useLocation } from 'react-router-dom'

import Spin from '../../Spin'

function NormalSwitch({ children, ...props }) {
  const location = useLocation()

  return (
    <Suspense fallback={<Spin.Page displayDelay={100} />}>
      <Switch key={location.key} location={location} {...props}>
        {children}
      </Switch>
    </Suspense>
  )
}

export default NormalSwitch
