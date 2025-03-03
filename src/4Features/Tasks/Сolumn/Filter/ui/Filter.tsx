import clsx from 'clsx'

import s from './Filter.module.scss'
import type {FilterComponentType} from './Filter.types'
import FilterSvg from '@public/assets/svg/Filter.svg'

const Filter: FilterComponentType = () => {
  return <FilterSvg className={s.filterSvg} />
}

export default Filter
