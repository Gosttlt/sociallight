import s from './Sort.module.scss'
import type {SortComponentType} from './Sort.types'
import SortSvg from '@public/assets/svg/Sort.svg'

const Sort: SortComponentType = () => {
  return <SortSvg className={s.sortSvg} />
}

export default Sort
