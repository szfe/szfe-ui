import { useState, useEffect, useRef } from 'react'
import { value } from 'szfe-tools'

const fix0 = Array.from({ length: 10 }, (_, i) => `0${i}`)
const formatTime = (t) => {
  let h = t / 1000 / 3600
  let m = (h - Math.floor(h)) * 60
  let s = (m - Math.floor(m)) * 60
  h = Math.floor(h).toString()
  m = Math.floor(m).toString()
  s = Math.floor(s).toString()

  return `${value(fix0[h], h)}:${value(fix0[m], m)}:${value(fix0[s], s)}`
}

const getCountDown = (deadline, localOffset = 0) => {
  if (!deadline) {
    return '-- -- --'
  }

  const date = Date.now() + localOffset

  return date < deadline ? formatTime(deadline - date) : '00:00:00'
}

function Countdown({ deadline, localOffset }) {
  const [countdown, setCountdown] = useState(() =>
    getCountDown(deadline, localOffset)
  )
  const interval = useRef()

  const count = () => {
    const countdown = getCountDown(deadline, localOffset)

    if (countdown === '00:00:00') {
      stop()
    }

    setCountdown(countdown)
  }

  const stop = () => clearInterval(interval.current)

  const start = () => {
    count()
    interval.current = setInterval(count, 1000)
  }

  useEffect(() => {
    start()

    return stop
  }, [deadline, localOffset])

  return value(countdown, null)
}

export default Countdown
