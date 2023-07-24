# Email grouper worker

The responsibility of this worker is join the roles with subscribers. We make this

Para cada usuário, devemos criar um feed de vagas. Para isso, levei em consideração três parâmetros: habilidades, idioma e anos de experiência. Cada parâmetro tem um peso diferente, seguindo a ordem descrita acima. Além disso, fiz uma filtragem nos resultados. Primeiro, filtro por habilidades. Após isso, pego o resultado e filtro por inglês. Em seguida, filtro por anos de experiência (startedWorkingAt).
**Observação:** Parti do ponto que se o campo for `NULL` ele sera considerado um valor verdadeiro pro filtro.

Isso funciona, os resultados são filtrados, e o algoritmo ficaria muito bem desacoplado. Conseguiríamos organizar a ordem de filtragem e até mesmo não executá-las, por exemplo, caso o input seja somente a tecnologia, o único filtro necessário seria esse. No entanto, minha preocupação seria referente ao IOPS. O algoritmo executará uma quantidade massiva de feeds e obrigatoriamente de forma concorrente com outros processos. Será que isso poderia ser um problema?

## Criterios para o envio do email

- Habilidades (Skills)
- Idiomas do usuário (Inglês / Português)
- Anos de experiência (Senioridade)
