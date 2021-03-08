import { Card, Space } from 'antd'
import PokemonType from 'components/Type'

interface Props {
  image: string
  imageAltText: string
  name: string
  number: string
  types: string[]
}

const PokemonListItem = ({
  image,
  imageAltText,
  name,
  number,
  types,
}: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div style={{ height: '45px' }} />
      <Card className="text-center relative w-full">
        <div style={{ height: '24px' }} />
        <div className="text-sm mb-1 text-gray-400">#{number}</div>
        <div className="font-bold mb-4 text-lg">{name}</div>
        <Space>
          {(types || []).map((type) => (
            <PokemonType key={type} type={type} />
          ))}
        </Space>
      </Card>
      <img
        className="absolute w-auto top-0"
        style={{ height: '90px' }}
        src={image}
        alt={imageAltText}
      />
    </div>
  )
}

export default PokemonListItem
