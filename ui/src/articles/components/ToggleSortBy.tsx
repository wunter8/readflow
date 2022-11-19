import React from 'react'
import { Kbd, ToggleMenuItem } from '../../components'
import { SortBy } from '../models'

interface Props {
  value: SortBy
  onChange: (by: SortBy) => void
  keys: string
}

const values: {
  value: SortBy,
  icon: string,
  title: string
}[] = [
  {
    value: 'key',
    icon: 'schedule',
    title: 'Sort by date'
  },
  {
    value: 'stars',
    icon: 'grade',
    title: 'Sort by stars'
  }
]

const toggle = (value: SortBy) => value === 'key' ? 'stars' : 'key'

export const ToggleSortBy = ({value, onChange, keys}: Props) => (
  <>
    <ToggleMenuItem name='sort-by' value={value} onChange={onChange} values={values} />
    <Kbd keys={keys} onKeypress={() => onChange(toggle(value))} />
  </>
)
