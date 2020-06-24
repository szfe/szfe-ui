import gen from '../genTransition'
import './style.less'

const Up = gen({
  enter: 'szfe-slide--up-enter',
  enterActive: 'szfe-slide--enter-active',
  enterDone: 'szfe-slide--enter-done',
  exit: 'szfe-slide--exit',
  exitActive: 'szfe-slide--up-exit-active',
  exitDone: `${'szfe-slide--up-exit-done'} ${'szfe-slide--exit-done'}`,
})

const Slide = Up
Slide.Up = Up

Slide.Down = gen({
  enter: 'szfe-slide--down-enter',
  enterActive: 'szfe-slide--enter-active',
  enterDone: 'szfe-slide--enter-done',
  exit: 'szfe-slide--exit',
  exitActive: 'szfe-slide--down-exit-active',
  exitDone: `${'szfe-slide--down-exit-done'} ${'szfe-slide--exit-done'}`,
})

export default Slide
