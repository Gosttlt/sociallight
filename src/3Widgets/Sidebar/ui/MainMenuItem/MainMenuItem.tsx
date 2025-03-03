import clsx from 'clsx'

import s from './MainMenuItem.module.scss'
import type {MainMenuItemComponentType} from './MainMenuItem.types'
import ChevronSvg from '@public/assets/svg/Chevron.svg'

const MainMenuItem: MainMenuItemComponentType = props => {
  const {text, onClick, isOpenCollapse} = props

  return (
    <li onClick={onClick} className={s.mainMenuItemWrapper}>
      <span className={s.text}>{text}</span>
      <ChevronSvg
        className={clsx(s.svgChevron, {[s.svgChevronOpen]: isOpenCollapse})}
      />
    </li>
  )
}

export default MainMenuItem
