import {ReturnsortCbItems} from '../DndContainer/DndContainer.types'

export const removeAllSelectionsFromDocument = () => {
  const sel = document.getSelection()
  if (sel) {
    sel.removeAllRanges()
  }
}

export type DndItemDataType = {id: string | number; order: number} & {
  [key: string]: any
}

export const sortDndFn = (a: DndItemDataType, b: DndItemDataType) =>
  a.order - b.order
export const sortDndFnReverse = (a: DndItemDataType, b: DndItemDataType) =>
  b.order - a.order

export const inOneContainer = ({
  dragCard,
  cards,
  isNextPosition,
  lastOverCard,
  reverse,
}: {
  reverse?: boolean
  cards: DndItemDataType[]
  dragCard: DndItemDataType
  lastOverCard: DndItemDataType
  isNextPosition: boolean
}): Omit<ReturnsortCbItems, 'fromId'> => {
  const cardOrder = isNextPosition ? 0.1 : -0.1

  const newCards: DndItemDataType[] = cards
    .map((curCard: DndItemDataType) => {
      if (curCard.id === dragCard.id) {
        return {
          ...curCard,
          order: reverse
            ? lastOverCard.order - cardOrder
            : lastOverCard.order + cardOrder,
        }
      }
      return curCard
    })
    .sort(reverse ? sortDndFnReverse : sortDndFn)
    .map((curCard: {id: string | number; order: number}, i: number) => ({
      ...curCard,
      order: reverse ? cards.length - 1 - i : i,
    }))

  return {
    fromCard: newCards,
    toCard: null,
  }
}

export const toEndinOneCurrent = ({
  cards,
  dragCard,
  reverse,
}: {
  cards: DndItemDataType[]
  dragCard: DndItemDataType
  reverse?: boolean
}): Omit<ReturnsortCbItems, 'fromId'> => {
  let filterCards = cards.filter(curCard => dragCard.id !== curCard.id)
  filterCards.push(dragCard)
  const sortCards = filterCards.map((curCard, index) => ({
    ...curCard,
    order: reverse ? cards.length - 1 - index : index,
  }))

  return {
    fromCard: sortCards,
    toCard: null,
  }
}

export const toEndAnotherContainer = ({
  fromCards,
  toCards,
  dragCard,
  reverse,
}: {
  fromCards: DndItemDataType[]
  toCards: DndItemDataType[]
  dragCard: DndItemDataType
  reverse?: boolean
}): Omit<ReturnsortCbItems, 'fromId'> => {
  const filterFromCards = fromCards
    .filter(curCard => curCard.id !== dragCard.id)
    .map((curCard, index) => ({
      ...curCard,
      order: reverse ? fromCards.length - 2 - index : index,
    }))

  toCards.push(dragCard)

  const sortCards = toCards.map((card, index) => ({
    ...card,
    order: reverse ? toCards.length - 1 - index : index,
  }))

  return {
    fromCard: filterFromCards,
    toCard: sortCards,
  }
}

export const getDataOtherCard = ({
  dragCard,
  fromCards,
  toCards,
  isNextPosition,
  lastOverCard,
  reverse,
}: {
  fromCards: DndItemDataType[]
  toCards: DndItemDataType[]
  dragCard: DndItemDataType
  lastOverCard: DndItemDataType
  isNextPosition: boolean
  reverse?: boolean
}): Omit<ReturnsortCbItems, 'fromId'> => {
  const filterFromCards = fromCards
    .filter(curCard => curCard.id !== dragCard.id)
    .map((curCard, index) => ({
      ...curCard,
      order: reverse ? fromCards.length - 2 - index : index,
    }))

  const cardOrder = isNextPosition ? 0.1 : -0.1

  const newDragCard = {
    ...dragCard,
    order: reverse
      ? lastOverCard.order - cardOrder
      : lastOverCard.order + cardOrder,
  }

  const newToCards = [...toCards, newDragCard]
    .sort(reverse ? sortDndFnReverse : sortDndFn)
    .map((curCard, index) => ({
      ...curCard,
      order: reverse ? toCards.length - index : index,
    }))

  return {
    fromCard: filterFromCards,
    toCard: newToCards,
  }
}
export const hasSharedContainer = (
  node: HTMLElement | null,
  sharedContainerId: string | null,
) => {
  return !!(
    node && node.closest(`[data-shared-container-id='${sharedContainerId}']`)
  )
}

// \ Other
