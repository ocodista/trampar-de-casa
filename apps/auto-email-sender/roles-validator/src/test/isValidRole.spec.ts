import { faker } from '@faker-js/faker'
import { isValidRole } from 'src/isValidRole'
import { vi } from 'vitest'
import * as searchRoleOnSiteFile from '../isValidRoleOnSite'
import * as launchBrowserAndNavigateFile from '../launchBrowserAndNavigateTo'
import * as setViewportFile from '../setViewport'

const BASE_URL = faker.internet.url()
const BASE_ROLE = faker.person.jobTitle()
const launchBrowserAndNavigateToPageStub = vi.fn()

const setViewportStub = vi.fn()
const isValidRoleOnSiteStub = vi.fn()
const browserCloseStub = vi.fn()

describe('verifySite', () => {
  beforeEach(() => {
    vi.spyOn(
      launchBrowserAndNavigateFile,
      'launchBrowserAndNavigateToPage'
    ).mockImplementation(launchBrowserAndNavigateToPageStub)

    launchBrowserAndNavigateToPageStub.mockResolvedValue({
      page: {},
      browser: { close: browserCloseStub },
    })

    vi.spyOn(setViewportFile, 'setViewport').mockImplementation(setViewportStub)
    vi.spyOn(searchRoleOnSiteFile, 'isValidRoleOnSite').mockImplementation(
      isValidRoleOnSiteStub
    )
  })
  afterEach(() => vi.clearAllMocks())

  it('launches a browser and navigates to the specified URL', async () => {
    launchBrowserAndNavigateToPageStub.mockResolvedValue({
      page: {
        type: vi.fn(),
        waitForSelector: vi.fn(),
        click: vi.fn(),
        browser: vi.fn(),
      },
      browser: {
        close: vi.fn(),
      },
    })
    await isValidRole(BASE_URL, BASE_ROLE)

    expect(launchBrowserAndNavigateToPageStub).toBeCalled()
  })

  it('sets the screen size correctly', async () => {
    await isValidRole(BASE_URL, BASE_ROLE)

    expect(setViewportStub).toBeCalled()
  })

  it('search if role name exists on page', async () => {
    await isValidRole(BASE_URL, BASE_ROLE)

    expect(isValidRoleOnSiteStub).toBeCalled()
  })

  it('closes the browser after completing the verification', async () => {
    await isValidRole(BASE_URL, BASE_ROLE)

    expect(browserCloseStub).toBeCalled()
  })
})
