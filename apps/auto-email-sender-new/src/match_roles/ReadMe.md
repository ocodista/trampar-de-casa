# Similarity Jobs

Projeto com objetivo de criar uma lista de recomendações de vagas mais aderentes para um determinado candididato.

Atualmente são consideradas duas informações:

1. Idioma
2. Lista de skills

## Setup

1. Criação do env Python: `python -m venv matchenv`
2. Activate do env Python: `source matchenv/bin/activate`
3. Instalando dependências: `pip install -r requirements.txt`

## Treinamento do modelo

Só é necessário retreinar o modelo quando novas skills são adicionadas à base de dados.

Para isso, basta executar o script `src/train/onehot.py`:

```bash
cd src/train/; python onehot.py --entity skills
```

O **onehot** é responsável por padronizar sempre os dados de entrada. Isto é, quando recebemos um array `[1,45,421]`, ele é responsável por transformar em um array de tamanho 479: `[1,0,...,0,1,0...0,1,0,...,0]`.

## Execução

Foi criado um endpoint para servir o modelo criado.

Basta subir o `docker-compose`:

```bash
docker-compose up --build
```

## Consumo

Para obter uma recomendação, basta realizar uma requisição para `http://127.0.0.1:8000/best_role`.

A documentação está disponível em: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

Os parâmetros dessa requisição são:

- skills (obrigatório): string da lista de ids das skills que o usuário possui, separda por vírgula: `'1,46,400'`
- languages (opcional / defaul='English,Portuguese'): string da lista de idiomas que o usuário quer receber vagas
- n (opcional / defaul=40): quantidade de recomendações

Utilizando `curl`:

```bash
curl -X 'GET'\
  'http://127.0.0.1:8000/best_role?skills=25%2C40%2C450&languages=English%2CPortuguese&n=2'\
  -H 'accept: application/json'
```

Utilizando `Python`:

```python
import requests

params = {'skills': '0,48,450', 'n':2}

req = requests.get("http://localhost:8000/best_role", params=params)
req.json()

```

Como resposta, é retornado uma lista das vagas em ordem descrescente de similaridade. Isto é, da vaga com maior similaridade para a menor.

```json
[
  {
    "id": "895a4673-11f0-4b08-96fc-34a29a023f77",
    "similarity": 0.40824829046386313
  },
  {
    "id": "a42547cf-c0ac-4305-9717-0c4f8b9c4286",
    "similarity": 0.33333333333333326
  }
]
```

## Método

Utilizamos uma distância de cosenos para mediar a similaridade das skills das vagas com as skills do candidato.

Algo similar ao exemplos abaixo.

```python
from scipy.spatial import distance

dist = distance.cosine([0,1,0], [0,1,1])
similarity = 1 - dist
```

Porêm, como temos 479 skills, cada um dos arrays terá essa dimensão com valores 0s e 1s. Assim, comparamos cada usuário com todoas as vagas e realizamos a ordenação (ranqueamento) das vagas para serem enviadas ao usuário.
