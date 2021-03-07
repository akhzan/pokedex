import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tag,
} from 'antd'
import { SearchOutlined, SyncOutlined } from '@ant-design/icons'
import pokemons from 'assets/data/pokemons.json'

const Home = () => {
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold mb-12">Pokedex</h1>
      <div className="flex items-center mb-12">
        <Input
          className="flex-auto mr-3"
          placeholder="Search your pokemon here"
          prefix={<SearchOutlined />}
        />
        <Button type="primary" icon={<SyncOutlined />} className="px-12">
          Surprise me!
        </Button>
      </div>
      <div className="flex justify-between">
        <Select
          defaultValue="lucy"
          bordered={false}
          style={{ marginLeft: '-11px' }}
        >
          <Select.Option value="jack">Ascending</Select.Option>
          <Select.Option value="lucy">Descending</Select.Option>
        </Select>
        <div>
          <span className="mr-3">from</span>
          <InputNumber min={1} max={1000} defaultValue={1} />
          <span className="mx-3">to</span>
          <InputNumber min={1} max={1000} defaultValue={1000} />
        </div>
      </div>
      <Row gutter={[8, 8]} className="mt-4 mb-8">
        <Col xs={12} sm={12} md={6}>
          <Select
            placeholder="Type"
            className="w-full"
            suffixIcon={<SearchOutlined />}
          >
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="Yiminghe">yiminghe</Select.Option>
          </Select>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Select
            placeholder="Type"
            className="w-full"
            suffixIcon={<SearchOutlined />}
          >
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="Yiminghe">yiminghe</Select.Option>
          </Select>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Select
            placeholder="Type"
            className="w-full"
            suffixIcon={<SearchOutlined />}
          >
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="Yiminghe">yiminghe</Select.Option>
          </Select>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Select
            placeholder="Type"
            className="w-full"
            suffixIcon={<SearchOutlined />}
          >
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="Yiminghe">yiminghe</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        {pokemons.map((pokemon, idx) => (
          <Col key={idx} xs={12} sm={12} md={6}>
            <div className="flex flex-col items-center">
              <div style={{ height: '45px' }} />
              <Card className="text-center relative w-full">
                <div style={{ height: '24px' }} />
                <div className="text-sm mb-1 text-gray-500">
                  #{pokemon.number}
                </div>
                <div className="font-bold mb-4 text-lg">{pokemon.name}</div>
                <Space>
                  {(pokemon.type || []).map((type) => (
                    <Tag className="text-sm" key={type}>
                      {type.toUpperCase()}
                    </Tag>
                  ))}
                </Space>
              </Card>
              <img
                className="absolute w-auto top-0"
                style={{ height: '90px' }}
                src={pokemon.ThumbnailImage}
                alt={pokemon.ThumbnailAltText}
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Home
