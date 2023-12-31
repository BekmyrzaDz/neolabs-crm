import {
  DetailedHTMLProps,
  SelectHTMLAttributes,
} from 'react'

export interface Option {
  key: string
  value: string | number | boolean
}

export interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  name: string
  label: string
  options: Option[]
  className?: string
}
