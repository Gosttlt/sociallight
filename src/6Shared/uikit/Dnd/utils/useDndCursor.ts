import {useDndStore} from '../State'

export const hasСlosestParentSharedContainer = (
  node: null | HTMLElement,
  sharedContainerId: string | null,
) => {
  if (node && sharedContainerId) {
    const container = node.closest(`[ data-dnd-tvo="true"]`)
    if (container instanceof HTMLElement) {
      return container.dataset.sharedContainerId === sharedContainerId
    }
  }
  return false
}

export const useDndCursor = (node: null | HTMLElement) => {
  const sharedContainerId = useDndStore(state => state.sharedContainerId)
  const isDragReady = useDndStore(state => state.isDragReady)
  const isDragStart = useDndStore(state => state.isDragStart)

  if (node) {
    const container = node.closest(`[ data-dnd-tvo="true"]`)
    if (isDragStart) {
      if (!container) {
        return 'grabbing'
      }
      if (container && container instanceof HTMLElement) {
        if (container.dataset.sharedContainerId === sharedContainerId) {
          return 'cell'
        } else {
          return 'no-drop'
        }
      }
    }
    //
    else if (isDragReady && container) {
      return 'grab'
    }
  }
}
