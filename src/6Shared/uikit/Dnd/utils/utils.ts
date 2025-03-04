import {ReturnsortCbItems} from '../DndContainer/DndContainer.types'

export const getTransformValue = (node: HTMLDivElement) => {
  const transform = node.style.transform
  let re = /translate\(([^()]+)\)/
  if (transform) {
    const valuesTransformAfterRe = transform.match(re)
    if (valuesTransformAfterRe) {
      const transformValuesArr = valuesTransformAfterRe[1].split('px,')
      return Number(transformValuesArr[0])
    }
  }
  return 0
}

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
  const firstOrder = cards[0].order

  const newCards: DndItemDataType[] = cards
    .map((curCard: DndItemDataType) => {
      if (curCard.id === dragCard.id) {
        if (reverse) {
          return {...curCard, order: lastOverCard.order - cardOrder}
        } else {
          return {...curCard, order: lastOverCard.order + cardOrder}
        }
      }
      return curCard
    })
    .sort(reverse ? sortDndFnReverse : sortDndFn)
    .map((curCard: {id: string | number; order: number}, i: number) => ({
      ...curCard,
      order: reverse ? firstOrder - i : i + firstOrder,
    }))

  return {
    fromCard: newCards,
    toCard: null,
  }
}

export const getDataCurrentParent = ({
  cards,
  dragCard,
}: {
  cards: DndItemDataType[]
  dragCard: DndItemDataType
}): Omit<ReturnsortCbItems, 'fromId'> => {
  const firstOrder = cards[0].order
  let filterCards = cards.filter(curCard => dragCard.id !== curCard.id)
  filterCards.push(dragCard)
  const sortCards = filterCards.map((curCard, index) => ({
    ...curCard,
    order: index + firstOrder,
  }))

  return {
    fromCard: sortCards,
  }
}

export const getDataOtherParent = ({
  fromCards,
  toCards,
  dragCard,
}: {
  fromCards: DndItemDataType[]
  toCards: DndItemDataType[]
  dragCard: DndItemDataType
}): Omit<ReturnsortCbItems, 'fromId'> => {
  const filterFromCards = fromCards
    .filter(curCard => curCard.id !== dragCard.id)
    .map((curCard, index) => ({...curCard, order: index}))

  const sortCards = [...toCards, {...dragCard, order: toCards.length}]

  return {
    fromCard: filterFromCards,
    toCard: sortCards,
  }
}

// export const getDataOtherCard = ({
//   dragCard,
//   fromCards,
//   toCards,
//   isNextPosition,
//   lastOverCard,
// }: {
//   fromCards: DndItemDataType[]
//   toCards: DndItemDataType[]
//   dragCard: DndItemDataType
//   lastOverCard: DndItemDataType
//   isNextPosition: boolean
// }): Omit<ReturnsortCbItems, 'fromId'> => {
//   const filterFromCards = fromCards
//     .filter(curCard => curCard.id !== dragCard.id)
//     .map((curCard, index) => ({...curCard, order: index}))

//   const cardOrder = isNextPosition ? 0.1 : -0.1

//   const newDragCard = {...dragCard, order: lastOverCard.order + cardOrder}

//   const newToCards = [...toCards, newDragCard]
//     .sort(sortDndFn)
//     .map((curCard, index) => ({...curCard, order: index}))

//   return {
//     fromCard: filterFromCards,
//     toCard: newToCards,
//   }
// }
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
  console.log(123, 'fromId')
  const firstFromOrder = fromCards[0].order
  const firstToOrder = toCards[0].order

  const filterFromCards = fromCards
    .filter(curCard => curCard.id !== dragCard.id)
    .map((curCard, index) => ({
      ...curCard,
      order: firstFromOrder - (1 + index),
    }))

  const cardOrder = isNextPosition ? 0.1 : -0.1

  const newDragCard = {...dragCard, order: lastOverCard.order - cardOrder}

  const newToCards = [...toCards, newDragCard]
    .sort(reverse ? sortDndFnReverse : sortDndFn)
    .map((curCard, index) => ({...curCard, order: 1 + firstToOrder - index}))

  return {
    fromCard: filterFromCards,
    toCard: newToCards,
  }
}

// /Sorted

// Other

export const hasSharedContainer = (
  node: HTMLElement | null,
  sharedContainerId: string | null,
) => {
  return !!(
    node && node.closest(`[data-shared-container-id='${sharedContainerId}']`)
  )
}

// \ Other
