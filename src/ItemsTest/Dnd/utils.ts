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

// Styled

// \Styled

// Sorted

export const sortDndFn = (a: DndItemDataType, b: DndItemDataType) =>
  a.order - b.order

export const inOneContainer = ({
  dragCard,
  cards,
  isNextPosition,
  lastOverCard,
}: {
  cards: DndItemDataType[]
  dragCard: DndItemDataType
  lastOverCard: DndItemDataType
  isNextPosition: boolean
}): DndItemDataType[] => {
  const cardOrder = isNextPosition ? 0.1 : -0.1
  const firstOrder = cards[0].order

  const newCards: DndItemDataType[] = cards
    .map((curCard: DndItemDataType) => {
      if (curCard.id === dragCard.id) {
        return {...curCard, order: lastOverCard.order + cardOrder}
      }
      return curCard
    })
    .sort(sortDndFn)
    .map((curCard: {id: string | number; order: number}, i: number) => ({
      ...curCard,
      order: i + firstOrder,
    }))

  return newCards
}
export const getSortedDataDnd = {
  inOneContainer,
  inOneContainerLast: () => {},
}
export const getDataCurrentParent = ({
  cards,
  dragCard,
}: {
  cards: DndItemDataType[]
  dragCard: DndItemDataType
}) => {
  const firstOrder = cards[0].order
  let filterCards = cards.filter(curCard => dragCard.id !== curCard.id)
  filterCards.push(dragCard)
  const sortCards = filterCards.map((curCard, index) => ({
    ...curCard,
    order: index + firstOrder,
  }))
  return sortCards
}

export const getDataOtherParent = ({
  fromCards,
  toCards,
  dragCard,
  fromParentId,
  toParentId,
}: {
  fromCards: DndItemDataType[]
  toCards: DndItemDataType[]
  dragCard: DndItemDataType
  fromParentId: string
  toParentId: string
}) => {
  const filterFromCards = fromCards
    .filter(curCard => curCard.id !== dragCard.id)
    .map((curCard, index) => ({...curCard, order: index}))

  const sortCards = [...toCards, {...dragCard, order: toCards.length}]

  return {
    fromCard: filterFromCards,
    toCard: sortCards,
    fromParentId,
    toParentId,
  }
}

export const getDataOtherCard = ({
  dragCard,
  fromCards,
  toCards,
  isNextPosition,
  lastOverCard,
  fromParentId,
  toParentId,
}: {
  fromCards: DndItemDataType[]
  toCards: DndItemDataType[]
  dragCard: DndItemDataType
  lastOverCard: DndItemDataType
  isNextPosition: boolean
  fromParentId: string
  toParentId: string
}) => {
  const filterFromCards = fromCards
    .filter(curCard => curCard.id !== dragCard.id)
    .map((curCard, index) => ({...curCard, order: index}))

  const cardOrder = isNextPosition ? 0.1 : -0.1

  const newDragCard = {...dragCard, order: lastOverCard.order + cardOrder}

  const newToCards = [...toCards, newDragCard]
    .sort(sortDndFn)
    .map((curCard, index) => ({...curCard, order: index}))

  return {
    fromCard: filterFromCards,
    toCard: newToCards,
    fromParentId,
    toParentId,
  }
}

// /Sorted
