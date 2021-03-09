import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Spin, Tag } from 'antd'
import PokemonType from 'components/Type'
import { STATS } from 'config/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useRoute from 'router/useRoute'
import { fetchDetail } from 'store/pokemon'
import { RootState } from 'store/root-reducer'

const Detail = () => {
  const dispatch = useDispatch()
  const { id }: any = useParams()
  const { raw, rawSequence, loadingDetail } = useSelector(
    (state: RootState) => state.pokemon,
  )
  const { goToHome, goToDetail } = useRoute()
  const pokemon = raw[id.toLowerCase()] || {}

  useEffect(() => {
    if (pokemon.name && id) {
      dispatch(fetchDetail(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.name, id])

  const renderMoreDetail = () => {
    if (loadingDetail) {
      return <Spin className="my-8 block" />
    }
    return (
      <div>
        <Row justify="center">
          <Col span={12}>
            <Row gutter={8} justify="center" className="mb-12">
              {pokemon.detail?.stats?.length ? (
                pokemon.detail.stats.map((stat) => (
                  <Col key={stat.name} span={4}>
                    <p className="text-sm text-gray-400">{STATS[stat.name]}</p>
                    <p>{stat.value}</p>
                  </Col>
                ))
              ) : (
                <p className="text-sm text-center italic text-gray-400">
                  Stats can not be loaded.
                </p>
              )}
            </Row>
          </Col>
        </Row>
        <Row gutter={8} justify="center">
          {pokemon.detail?.prev && (
            <Col>
              <Button
                size="large"
                type="text"
                onClick={() => goToDetail(pokemon.detail?.prev?.name || '')}
              >
                <Space>
                  <LeftOutlined />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">
                      #{pokemon.detail.prev.number}
                    </div>
                    <div className="text-sm">{pokemon.detail.prev.name}</div>
                  </div>
                  <img
                    style={{ height: '27px' }}
                    className="w-auto"
                    src={pokemon.detail.prev.ThumbnailImage}
                    alt=""
                  />
                </Space>
              </Button>
            </Col>
          )}
          {pokemon.detail?.next && (
            <Col>
              <Button
                size="large"
                type="text"
                onClick={() => goToDetail(pokemon.detail?.next?.name || '')}
              >
                <Space>
                  <img
                    style={{ height: '27px' }}
                    className="w-auto"
                    src={pokemon.detail.next.ThumbnailImage}
                    alt=""
                  />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">
                      #{pokemon.detail.next.number}
                    </div>
                    <div className="text-sm">{pokemon.detail.next.name}</div>
                  </div>
                  <RightOutlined />
                </Space>
              </Button>
            </Col>
          )}
        </Row>
      </div>
    )
  }

  const renderContent = () => {
    if (!rawSequence.length) {
      return <Card style={{ marginTop: '100px' }} loading />
    }
    if (!pokemon.name) {
      return (
        <Card style={{ marginTop: '100px' }}>
          <div className="text-center">No pokemon found.</div>
          <Row justify="center" className="mt-4">
            <Button onClick={goToHome}>Explore More Pokemon</Button>
          </Row>
        </Card>
      )
    }
    return (
      <div className="flex flex-col items-center">
        <div style={{ height: '100px' }} />
        <Card className="text-center relative w-full">
          <div style={{ height: '80px' }} />
          <div className="mb-1 text-gray-400">#{pokemon.number}</div>
          <div className="font-bold mb-8 text-2xl">{pokemon.name}</div>
          <Space className="mb-12">
            {(pokemon.type || []).map((type) => (
              <PokemonType key={type} type={type} />
            ))}
          </Space>
          <p className="mb-2 text-gray-400">Weaknessess</p>
          <Space className="mb-12">
            {(pokemon.weakness || []).map((type) => (
              <PokemonType key={type} type={type} />
            ))}
          </Space>
          <p className="mb-2 text-gray-400">Abilities</p>
          <Space className="mb-12">
            {(pokemon.abilities || []).map((ability) => (
              <Tag key={ability}>{ability}</Tag>
            ))}
          </Space>
          {renderMoreDetail()}
          <Row justify="center" className="mt-12">
            <Button onClick={goToHome}>Explore More Pokemon</Button>
          </Row>
        </Card>
        <img
          className="absolute w-auto top-0"
          style={{ height: '200px' }}
          src={pokemon.ThumbnailImage}
          alt={pokemon.ThumbnailAltText}
        />
      </div>
    )
  }

  return (
    <Row justify="center" className="mt-8">
      <Col xs={24} sm={24} md={18} lg={12}>
        {renderContent()}
      </Col>
    </Row>
  )
}

export default Detail
