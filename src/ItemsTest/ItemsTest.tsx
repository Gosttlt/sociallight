import s from './ItemsTest.module.scss'
import type {ItemsTestComponentType} from './ItemsTest.types'
import React, {ChangeEvent, useState} from 'react'

import {DndItemDataType} from '@/6Shared/uikit/Dnd/utils/utils'
import {ReturnsortCbItems} from '@/6Shared/uikit/Dnd/DndContainer/DndContainer.types'
import DndContainer from '@/6Shared/uikit/Dnd/DndContainer/DndContainer'
import DndItem from '@/6Shared/uikit/Dnd/DndItems/DndItem'
import useDebaunce from '@/6Shared/hooks/uiHooks/useDebaunce'

const fromItems: DndItemDataType[] = [
  {id: '1', name: '1 from', order: 1},
  {id: '2', name: '2 from', order: 2},
  {id: '3', name: '3 from', order: 3},
  {id: '4', name: '4 from', order: 4},
  {id: '5', name: '5 from', order: 5},
  {id: '6', name: '6 from', order: 6},
  {id: '7', name: '7 from', order: 7},
  {id: '8', name: '8 from', order: 8},
]

const toItems: DndItemDataType[] = [
  {id: '9', name: '1 to', order: 1},
  {id: '10', name: '2 to', order: 2},
  {id: '11', name: '3 to', order: 3},
  {id: '12', name: '4 to', order: 4},
  {id: '13', name: '5 to', order: 5},
  {id: '14', name: '6 to', order: 6},
  {id: '15', name: '7 to', order: 7},
  {id: '16', name: '8 to', order: 8},
]

const otherItems: DndItemDataType[] = [
  {id: '17', name: '1 oth', order: 1},
  {id: '18', name: '2 oth', order: 2},
  {id: '19', name: '3 oth', order: 3},
  {id: '20', name: '4 oth', order: 4},
  {id: '21', name: '5 oth', order: 5},
  {id: '22', name: '6 oth', order: 6},
  {id: '23', name: '7 oth', order: 7},
  {id: '24', name: '8 oth', order: 8},
]

const ItemsTest: ItemsTestComponentType = props => {
  const [items, setItems] = useState<Record<string, DndItemDataType[]>>({
    fromData: fromItems,
    toData: toItems,
    otherItems: otherItems,
  })

  const onClick = () => {
    // const newItems = inOneContainer({
    //   cards: data,
    //   dragCard: {id: '2', order: 2},
    //   isNextPosition: true,
    //   lastOverCard: {id: 6, order: 6},
    // })
    // const newItems = toEndinOneCurrent({
    //   cards: fromData,
    //   dragCard: {id: '2', order: 2, name: '2'},
    // })
    // console.log(fromCard, toCard)
  }

  const setData = (data: ReturnsortCbItems) => {
    const {fromCard, fromId, toCard, toID} = data
    const toObj = toID && toCard ? {[toID]: toCard} : {}

    setItems({...items, ...{[fromId]: fromCard, ...toObj}})
  }

  const [intut, setInput] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
    debFn('dasda')
  }
  const fn = (asd: string) => {
    console.log(asd)
  }
  const debFn = useDebaunce(fn)
  return (
    <>
      {/* <button onClick={() => setData('fromData', items.toData)}>asddsa</button> */}
      <div>
        <input value={intut} onChange={onChange} />
        <h2>from Container</h2>
        <DndContainer
          // direction='vertical'
          containerId='fromData'
          setData={items => {
            setData(items)
          }}
          items={items.fromData}
          sharedId='testSharedId'
        >
          {items.fromData.map((card, index) => (
            <DndItem index={index} card={card} key={card.id}>
              <div key={card.id} draggable='false' className={s.item}>
                <div>{card.name}</div>
              </div>
            </DndItem>
          ))}
        </DndContainer>
        <hr style={{margin: '24px 0'}} />
      </div>

      <div>
        <h2>to Container</h2>
        <DndContainer
          // direction='vertical'
          containerId='toData'
          setData={items => {
            setData(items)
          }}
          items={items.toData}
          sharedId='testSharedId'
        >
          {items.toData.map((card, index) => (
            <DndItem index={index} card={card} key={card.id}>
              <div key={card.id} draggable='false' className={s.item}>
                <div>{card.name}</div>
              </div>
            </DndItem>
          ))}
        </DndContainer>
        <hr style={{margin: '24px 0'}} />
      </div>
      <div>
        <h2>Other Container</h2>
        <DndContainer
          direction='vertical'
          containerId='otherItems'
          setData={items => {
            console.log('items from ', items)
            setData(items)
          }}
          items={items.otherItems}
          sharedId='testDontSharedId'
        >
          {items.otherItems.map((card, index) => (
            <DndItem index={index} card={card} key={card.id}>
              <div key={card.id} draggable='false' className={s.item}>
                <div>{card.name}</div>
              </div>
            </DndItem>
          ))}
        </DndContainer>
      </div>
    </>
  )
}

export default ItemsTest
