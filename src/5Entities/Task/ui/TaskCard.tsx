import Collapse from '@/6Shared/uikit/Collapse/Collapse'
import s from './TaskCard.module.scss'
import type {TaskCardComponentType} from './TaskCard.types'
import SettingSwitcher from './SettingSwitcher/SettingSwitcher'
import useCollapse from '@/6Shared/hooks/uiHooks/useCallapse'
import clsx from 'clsx'
import {useDndCursor} from '@/6Shared/uikit/Dnd/utils/useDndCursor'
import {useRef} from 'react'

const TaskCard: TaskCardComponentType = props => {
  const {children, EditTaskBtn, levelSelectors, isCreate = false} = props
  const {isBlock, isOpen, onSwitch} = useCollapse()
  const node = useRef<null | HTMLDivElement>(null)
  const cursor = useDndCursor(node.current)

  return (
    <div
      ref={node}
      style={{cursor}}
      className={clsx(s.cardWrapper, {[s.create]: isCreate})}
    >
      <div className={clsx({[s.noEvent]: cursor})}>
        <div className={s.shortTaskWrapper}>
          <SettingSwitcher isOpen={isOpen} onSwitch={onSwitch} />
          {children}
        </div>
        <Collapse isBlock={isBlock} isOpen={isOpen}>
          <div className={s.settingWrapper}>
            <div className={s.settingButtons}>{EditTaskBtn}</div>
            {levelSelectors.map(({text, Selector}) => {
              return (
                <div key={text} className={s.settingLevelWrapper}>
                  <div>{text}:</div>
                  <Selector />
                </div>
              )
            })}
          </div>
        </Collapse>
      </div>
    </div>
  )
}

export default TaskCard
