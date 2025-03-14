import type {InputHTMLAttributes} from 'react'

export type InputComponentType = InputProps & InptutProp

export type InputProps = {
  className?: string
  propTitle?: string
  stateBorder?: 'valid' | 'invalid' | 'novalid'
}

type InptutProp = InputHTMLAttributes<HTMLInputElement>
