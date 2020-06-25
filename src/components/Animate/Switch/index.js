import React, { forwardRef } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { classnames } from 'szfe-tools'



const TransitionSwitch = forwardRef(function TransitionSwitch(
  { direction, animateKey, children, className, ...props },
  forwardedRef
) {
  return (
    <TransitionGroup
      {...props}
      className={classnames(
        'szfe-transition-switch__transition-group',
        className
      )}
      childFactory={(child) =>
        // https://juejin.im/post/5cb1e4275188251ace1feee9#heading-7
        React.cloneElement(child, {
          classNames: {
            enter: 'szfe-transition-switch__animating',
            exit: 'szfe-transition-switch__animating',
            ...(direction === 'back'
              ? {
                  enterActive: 'szfe-transition-switch__fadeInLeft',
                  exitActive: 'szfe-transition-switch__fadeOutRight',
                }
              : {
                  enterActive: 'szfe-transition-switch__fadeInRight',
                  exitActive: 'szfe-transition-switch__fadeOutLeft',
                }),
          },
        })
      }
      ref={forwardedRef}
    >
      <CSSTransition
        key={animateKey}
        timeout={300}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <div className="szfe-transition-switch__animated-switch">{children}</div>
      </CSSTransition>
    </TransitionGroup>
  )
})

export default TransitionSwitch
