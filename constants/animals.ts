export const availableBreeds = [
  {id: 1, value: 'Jersey'},
  {id: 2, value: 'Holandesa'},
  {id: 3, value: 'Gir Leiteiro'},
  {id: 4, value: 'Guzerá'},
  {id: 5, value: 'Mestiça'},
  {id: 6, value: 'Não definida'},
]

export const availableClassifications = [
  {
    id: 1,
    value: 'cow-lactating',
    label: 'Lactante',
    sex: 'female',
    tooltip: 'Animal que está produzindo atualmente'
  },
  {
    id: 2,
    value: 'cow-non-lactating',
    label: 'Não Lactante',
    sex: 'female',
    tooltip: 'Animal que não produz mais'
  },
  {
    id: 3,
    value: 'cow-dry',
    label: 'Seca',
    sex: 'female',
    tooltip: 'Animal que já produziu mas agora não está. Pode estar em descanso reprodutivo'
  },
  {
    id: 4,
    value: 'heifer',
    label: 'Novilha',
    sex: 'female',
    tooltip: 'Novilha, apartir dos 14 meses que não pariu ou que não emprenhou ainda'
  },
  {
    id: 5,
    value: 'she-calves',
    label: 'Bezerra',
    sex: 'female',
    tooltip: 'Bezerra até os 14 meses de isade'
  },

  {
    id: 6,
    value: 'bull-reproductive',
    label: 'Touro reprodutivo',
    sex: 'male',
    tooltip: 'Macho adulto ativo na idade reprodutiva'
  },
  {
    id: 7,
    value: 'bull-castrated',
    label: 'Macho castrado',
    sex: 'male',
    tooltip: 'Macho adulto que não reproduz pois passou por castração'
  },
  {
    id: 8,
    value: 'bull-ruffian',
    label: 'Macho rufião',
    sex: 'male',
    tooltip: 'Macho adulto que não reproduz, servindo como detector de comportamento de cio para as fêmeas'
  },
  {
    id: 9,
    value: 'he-steer',
    label: 'Bezerro',
    sex: 'male',
    tooltip: 'Macho com idade de 12 meses até a idade adulta que ainda não atingiu a maturidade reprodutiva'
  },
  {
    id: 10,
    value: 'he-calves',
    label: 'Bezerro',
    sex: 'male',
    tooltip: 'Macho com até 12 meses'
  },
]

export const availableStatus = [
  {id: 1, value: 'alive', label: 'Vivo'},
  {id: 2, value: 'dead', label: 'Morto'},
  {id: 3, value: 'sold', label: 'Vendido'},
]