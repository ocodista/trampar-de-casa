import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { FAQCard } from './FAQCard'

describe('FAQCard', () => {
  it('renders properly the title and description', () => {
    const titleText = 'FAQ test'
    const descriptionText = 'FAQ description'
    const faqCard = render(
      <FAQCard title={titleText} description={descriptionText} />
    )
    const title = faqCard.getByText(titleText)
    const description = faqCard.getByText(descriptionText)

    expect(title.tagName).toBe('H3')
    expect(description.tagName).toBe('P')
  })
})
