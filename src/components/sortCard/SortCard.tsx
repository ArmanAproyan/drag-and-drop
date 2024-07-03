import React from 'react'
import './style.css'
import { CardSort } from '../../type/types'


const SortCard: React.FC<CardSort> = ({ sorting }) => {
  return (
    <button onClick={sorting}>Сортировать</button>
  )
}

export default SortCard
