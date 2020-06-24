import { useMemo, useRef, useState } from 'react'

function resolveHookState(newState, currentState) {
  if (typeof newState === 'function') {
    return newState(currentState)
  }

  return newState
}

export default function useGetSet(initialState) {
  const state = useRef(resolveHookState(initialState))
  const [, update] = useState(Math.random)

  return useMemo(
    () => [
      // get
      () => state.current,
      // set
      (newState) => {
        state.current = resolveHookState(newState, state.current)
        update(Math.random)
      },
    ],
    []
  )
}
