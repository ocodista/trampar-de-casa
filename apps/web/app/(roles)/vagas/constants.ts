export const experienceLevels = [
  { value: 'Estágio', label: '🎓 Estágio' },
  { value: 'Júnior', label: '👶 Júnior' },
  { value: 'Pleno', label: '🧑‍💼 Pleno' },
  { value: 'Sênior', label: '👴 Sênior' },
]

export const flags = [
  { value: 'Brasil', label: '🇧🇷 Brasil' },
  { value: 'EstadosUnidos', label: '🇺🇸 Estados Unidos' },
  { value: 'ReinoUnido', label: '🇬🇧 Reino Unido' },
]

export const orderOptions = [
  { value: null, label: '🛠️  Ordenar' },
  { value: 'ascending', label: '🕒 Vagas mais recentes' },
  { value: 'descending', label: '🕒 Vagas mais antigas' },
]

export const order = orderOptions.map((or) => or.label)
