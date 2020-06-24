import gen from '../genTransition'
import './style.less'

const Fade = gen({
  enter: 'szfe-fade--enter',
  enterActive: 'szfe-fade--enter-active',
  enterDone: 'szfe-fade--enter-done',
  exit: 'szfe-fade--exit',
  exitActive: 'szfe-fade--exit-active',
  exitDone: 'szfe-fade--exit-done',
})

export default Fade
