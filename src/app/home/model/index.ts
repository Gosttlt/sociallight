import {create} from 'zustand'

interface initialState {
  focusId: string | null
  setFocusId: (focusId: string) => void

  activeId: string | null
  setActiveId: (activeId: string) => void
}

// Как определить конечную точку драг ноды когда драговер в движении

export const useHomePageStore = create<initialState>(set => ({
  activeId: null,
  setActiveId: activeId => set({activeId}),
  focusId: null,
  setFocusId: focusId => set({focusId}),
}))
