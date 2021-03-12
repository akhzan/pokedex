import { Button, Card, Col, Divider, Input, Row, Spin, Tag } from 'antd'

import PokemonType from 'components/type'
import Pokemon from 'models/Pokemon'
import { STATS } from 'config/constants'
import useRoute from 'router/useRoute'
import { useCompareState } from './state'

const Compare = () => {
  const { goToHome } = useRoute()
  const { first, second, addPokemonToCompare, loading, win } = useCompareState()

  const renderPokemon = (pokemon: Pokemon) => (
    <Col span={10}>
      {pokemon.name ? (
        <img className="w-auto h-24" src={pokemon.ThumbnailImage} alt="" />
      ) : (
        <div className="italic text-sm text-gray-400">No pokemon selected</div>
      )}
    </Col>
  )

  const renderTypes = (pokemon: Pokemon, isType = true) => (
    <Col span={10}>
      <Row gutter={[8, 8]}>
        {((isType ? pokemon.type : pokemon.weakness) || []).map((t) => (
          <Col key={t}>
            <PokemonType type={t} />
          </Col>
        ))}
      </Row>
    </Col>
  )

  const renderAbilities = (pokemon: Pokemon) => (
    <Col span={10}>
      <Row gutter={[8, 8]}>
        {(pokemon.abilities || []).map((ability) => (
          <Col key={ability}>
            <Tag>{ability}</Tag>
          </Col>
        ))}
      </Row>
    </Col>
  )

  const renderStats = (pokemon: Pokemon) => {
    if (!pokemon.id) return <div />
    if (!pokemon.detail) {
      return <Spin />
    }
    if (pokemon.detail?.stats?.length) {
      return pokemon.detail.stats.map((stat) => (
        <div className="flex items-center" key={stat.name}>
          <p className="text-sm text-gray-400 w-16">{STATS[stat.name]}</p>
          <p>{stat.value}</p>
        </div>
      ))
    }
    return (
      <p className="text-sm text-center italic text-gray-400">
        Stats can not be loaded.
      </p>
    )
  }

  if (loading) {
    return (
      <Row justify="center">
        <Col xs={24} sm={24} md={18}>
          <Card loading />
        </Col>
      </Row>
    )
  }
  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={18}>
        <Card className="py-12">
          <Row gutter={16}>
            <Col span={4}>Compare</Col>
            <Col span={10}>
              <Input.Search
                size="small"
                className="mr-2"
                defaultValue={first.name}
                onSearch={(value) => addPokemonToCompare('first', value)}
              />
            </Col>
            <Col span={10}>
              <Input.Search
                size="small"
                className="mr-2"
                defaultValue={second.name}
                onSearch={(value) => addPokemonToCompare('second', value)}
              />
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={4}>Pokemon</Col>
            {renderPokemon(first)}
            {renderPokemon(second)}
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={4}>Name</Col>
            <Col span={10}>{first.name}</Col>
            <Col span={10}>{second.name}</Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={4}>Types</Col>
            {renderTypes(first)}
            {renderTypes(second)}
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={4}>Weaknessess</Col>
            {renderTypes(first, false)}
            {renderTypes(second, false)}
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={4}>Abilities</Col>
            {renderAbilities(first)}
            {renderAbilities(second)}
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={4}>Stats</Col>
            <Col span={10}>{renderStats(first)}</Col>
            <Col span={10}>{renderStats(second)}</Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={4}>Prediction</Col>
            <Col span={10}>
              {win.first ? <Tag color="#87d068">WINNER</Tag> : null}
            </Col>
            <Col span={10}>
              {win.second ? <Tag color="#87d068">WINNER</Tag> : null}
            </Col>
          </Row>
          <Row justify="center" className="mt-24">
            <Button onClick={goToHome}>Explore More Pokemon</Button>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Compare
