import { Tag } from 'antd'
import { TYPE_COLORS } from 'config/constants'

interface Props {
  type: string
}

const PokemonType = ({ type }: Props) => {
  const color: string = TYPE_COLORS[type.toUpperCase()]
  return (
    <Tag color={color} className="text-sm">
      {type.toUpperCase()}
    </Tag>
  )
}

export default PokemonType
