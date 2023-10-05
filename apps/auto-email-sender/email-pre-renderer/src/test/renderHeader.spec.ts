import { faker } from '@faker-js/faker'
import { HEADER_TITLE_SUFFIX } from 'src/Header'
import { renderHeader } from 'src/renderHeader'

describe('Render header', () => {
  it('Calculate the total roles count', () => {
    const rolesIds = Array.from({ length: 100 }, () => faker.string.uuid())

    const html = renderHeader(rolesIds)

    expect(html).toContain(`${rolesIds.length} ${HEADER_TITLE_SUFFIX}`)
  })
})
