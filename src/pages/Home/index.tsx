import { useCallback } from 'react'
import { Card, Col, Input, Row, Select } from 'antd'
import { AimOutlined, BlockOutlined, SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { capitalize, debounce } from 'lodash'

import { fetchListFiltered, fetchMoreList, setFilter } from 'store/pokemon'
import { RootState } from 'store/root-reducer'
import InfiniteScroll from 'components/InfiniteScroll'
import { SORTS, TYPE_COLORS } from 'config/constants'
import PokemonType from 'components/Type'
import Images from 'assets/images'
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
  const changeFilter = async (params: any) => {
    await dispatch(setFilter({ ...filter, ...params }))
    dispatch(fetchListFiltered({ ...filter, ...params }))
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceConfirmSearch = useCallback(debounce(changeFilter, 500), [])
  const changeSearchDebounce = (e: any) => {
    dispatch(setFilter({ ...filter, search: e.target.value }))
    debounceConfirmSearch({ search: e.target.value })
  }

  return (
    <div className="mt-12">
      <Row align="middle">
        <img src={Images.Logo} alt="" className="w-12 h-auto" />
        <h1 className="text-3xl font-bold ml-4">Pokedex</h1>
      </Row>
      <Input
        className="mb-6 mt-12"
        placeholder="Search your pokemon here"
        prefix={<SearchOutlined />}
        value={filter.search}
        onChange={changeSearchDebounce}
      />
      <Row gutter={[8, 8]} className="mb-8">
        <Col xs={12} sm={12} md={6}>
          <Select
            allowClear
            placeholder="Type"
            className="w-full"
            suffixIcon={<AimOutlined />}
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
            suffixIcon={<BlockOutlined />}
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
        <Col xs={24} sm={24} md={12}>
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
      </Row>
      <Row gutter={[16, 16]} className="mb-4">
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
