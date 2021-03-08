import { useCallback, useEffect } from 'react'
import { Button, Card, Col, Input, Row, Select } from 'antd'
import { SearchOutlined, SyncOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { capitalize, debounce } from 'lodash'

import {
  fetchList,
  fetchListFiltered,
  fetchMoreList,
  setFilter,
} from 'store/pokemon'
import { RootState } from 'store/root-reducer'
import InfiniteScroll from 'components/InfiniteScroll'
import { SORTS, TYPE_COLORS } from 'config/constants'
import PokemonType from 'components/Type'
import PokemonListItem from './PokemonListItem'

const Home = () => {
  const dispatch = useDispatch()
  const {
    filter,
    loading,
    listData,
    listDataView,
    raw,
    rawSequence,
  } = useSelector((state: RootState) => state.pokemon)
  const changeFilter = (params: any) => {
    dispatch(setFilter({ ...filter, ...params }))
    dispatch(fetchListFiltered({ ...filter, ...params }))
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceConfirmSearch = useCallback(debounce(changeFilter, 500), [])
  const changeSearchDebounce = (e: any) => {
    dispatch(setFilter({ ...filter, search: e.target.value }))
    debounceConfirmSearch({ search: e.target.value })
  }

  useEffect(() => {
    dispatch(fetchList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold mb-12">Pokedex</h1>
      <div className="flex items-center mb-6">
        <Input
          className="flex-auto mr-3"
          placeholder="Search your pokemon here"
          prefix={<SearchOutlined />}
          value={filter.search}
          onChange={changeSearchDebounce}
        />
        <Button type="primary" icon={<SyncOutlined />} className="px-12">
          Surprise me!
        </Button>
      </div>
      {/* <div className="flex justify-between mb-4">
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
      </div> */}
      <Row gutter={[8, 8]} className="mb-8">
        <Col xs={12} sm={12} md={6}>
          <Select
            allowClear
            placeholder="Type"
            className="w-full"
            suffixIcon={<SearchOutlined />}
            value={filter.type}
            onChange={(type) => changeFilter({ type })}
          >
            {Object.keys(TYPE_COLORS).map((key) => (
              <Select.Option key={key} value={capitalize(key)}>
                <PokemonType type={key} />
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Select
            allowClear
            placeholder="Weakness"
            className="w-full"
            suffixIcon={<SearchOutlined />}
            value={filter.weakness}
            onChange={(weakness) => changeFilter({ weakness })}
          >
            {Object.keys(TYPE_COLORS).map((key) => (
              <Select.Option key={key} value={capitalize(key)}>
                <PokemonType type={key} />
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={12} sm={12}>
          <Row justify="end">
            <Select
              style={{ width: 120 }}
              className="home__sort"
              bordered={false}
              value={filter.sort || SORTS.numberAsc.code}
              onChange={(sort) => changeFilter({ sort })}
            >
              {Object.values(SORTS).map((sort) => (
                <Select.Option key={sort.code} value={sort.code}>
                  {sort.label}
                </Select.Option>
              ))}
            </Select>
          </Row>
        </Col>
        {/* <Col xs={12} sm={12} md={6}>
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
        </Col> */}
      </Row>
      <Row gutter={[8, 8]} className="mb-4">
        {(listDataView || []).map((pokemonName) => {
          const pokemon = raw[pokemonName.toLowerCase()]
          return (
            <Col key={pokemonName} xs={12} sm={12} md={6}>
              <PokemonListItem
                image={pokemon.ThumbnailImage}
                imageAltText={pokemon.ThumbnailAltText}
                name={pokemon.name}
                number={pokemon.number}
                types={pokemon.type}
              />
            </Col>
          )
        })}
      </Row>
      {!rawSequence.length && <Card loading className="my-8" />}
      <InfiniteScroll
        hasMore={listDataView.length < listData.count}
        loading={loading}
        next={() => dispatch(fetchMoreList())}
      />
    </div>
  )
}

export default Home
