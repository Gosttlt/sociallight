import Button from '@/6Shared/uikit/Button'
import Catigories from '../../../../../3Widgets/Catigories/ui/Catigories'
import {setStartStylePlaceholderNode} from '../styleUtils'
import {render, screen, fireEvent} from '@testing-library/react'
import {ButtonComponentType} from '@/6Shared/uikit/Button/Button.types'
import Category from '@/4Features/Tasks/Category'
import DndContainer from '../../DndContainer/DndContainer'
import DndItem from '../../DndItems/DndItem'

const Asd = () => {
  const data = [
    {id: '0', order: 0, name: '0'},
    {id: '1', order: 1, name: '1'},
    {id: '2', order: 2, name: '2'},
    {id: '3', order: 3, name: '3'},
    {id: '4', order: 4, name: '4'},
  ]
  return (
    <DndContainer
      direction='horizontal'
      setData={() => {}}
      items={data}
      containerId='taskCategoryDnd'
      sharedId='taskCategoryDnd'
    >
      {data.map((card, index) => (
        <DndItem index={index} card={card} key={card.id}>
          <div>{card.name}</div>
        </DndItem>
      ))}
    </DndContainer>
  )
}

describe('Функция setStartStylePlaceholderNode для сортировки и смены ордеров в одном контейнере ', () => {
  test('Взял первую карту,положил в конец последней карты', () => {
    const {getByText} = render(<Asd />)
    const but = getByText('3')

    console.log(but)
    expect(but).toBeInTheDocument()
    // expect(
    //   setStartStylePlaceholderNode({direction, node, targetRect}),
    // ).toStrictEqual()
  })
})
