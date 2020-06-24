import React from 'react'
import { CSSTransition } from 'react-transition-group'

const gen = (styles) => {
  const Transition = ({ in: inProp, children, ...props }) => (
    <CSSTransition in={inProp} classNames={styles} {...props}>
      {children}
    </CSSTransition>
  )

  Transition.defaultProps = {
    unmountOnExit: true,
    timeout: 200,
  }

  return Transition
}

export default gen
