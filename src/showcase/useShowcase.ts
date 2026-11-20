import { useEffect, useReducer } from 'react'
import {
  createInitialState,
  showcaseReducer,
  type ShowcaseAction,
  type ShowcaseState,
} from './model'

export function useShowcase(): {
  state: ShowcaseState
  dispatch: (action: ShowcaseAction) => void
} {
  const [state, dispatch] = useReducer(showcaseReducer, undefined, createInitialState)

  useEffect(() => {
    if (state.phase === 'idle') return
    const delay =
      state.phase === 'understanding' ? 1150 : state.phase === 'placing' ? 900 : 2800
    const next: ShowcaseAction['type'] =
      state.phase === 'understanding' ? 'commit' : state.phase === 'placing' ? 'settle' : 'clear-phase'
    const timer = window.setTimeout(() => dispatch({ type: next }), delay)
    return () => window.clearTimeout(timer)
  }, [state.phase])

  return { state, dispatch }
}
