export const POKEMON_ITEMS_PER_FETCH = 16

export const TYPE_COLORS: { [key: string]: string } = {
  BUG: '#729E3E',
  DARK: '#707070',
  DRAGON: '#F26F57',
  ELECTRIC: '#EFD535',
  FAIRY: '#FCB8E8',
  FIGHTING: '#D66723',
  FIRE: '#FE7D24',
  FLYING: '#3CC7EE',
  GHOST: '#7C61A2',
  GRASS: '#9BCD4F',
  GROUND: '#AA9741',
  ICE: '#50C4E7',
  NORMAL: '#A4ABAE',
  POISON: '#BA7FC9',
  PSYCHIC: '#F367B9',
  ROCK: '#A38B20',
  STEEL: '#9EB8B8',
  WATER: '#4492C4',
}

export const SORTS = {
  nameAsc: { code: 'nameAsc', label: 'A - Z' },
  nameDsc: { code: 'nameDsc', label: 'Z - A' },
  numberAsc: { code: 'numberAsc', label: 'Lowest Number' },
  numberDsc: { code: 'numberDsc', label: 'Highest Number' },
}

export const STATS: { [key: string]: string } = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SATK',
  'special-defense': 'SDEF',
  speed: 'SPD',
}
