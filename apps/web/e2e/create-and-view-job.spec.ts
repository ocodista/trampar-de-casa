import { test, expect } from '@playwright/test'

test.describe('Fluxo de Criação de Vaga e Visualização no Dashboard', () => {
  test('deve criar uma vaga e visualizá-la no dashboard', async ({
    page,
    context,
  }) => {
    test.setTimeout(60000)
    // 1. Navegar para a página inicial e simular login
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.setItem('loginEmail', 'teste@gmail.com')
    })

    // 2. Navegar para a página de criação de vaga
    await page.goto('/vagas/publique')

    // 3. Preencher o formulário de vaga sem selecionar skills
    await page.fill('input[name="title"]', 'Desenvolvedor React')
    await page.fill('input[name="company"]', 'Empresa Teste')
    await page.fill('input[name="url"]', 'https://teste.com/vaga')
    await page.fill('input[name="country"]', 'Brasil')
    await page.selectOption('select[name="language"]', 'Português')
    await page.selectOption('select[name="currency"]', 'BRL')
    await page.fill('input[name="salary"]', '5000')
    await page.fill('input[name="minimumYears"]', '2')
    await page.fill(
      'input[name="description"]',
      '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptatem impedit illum quam, explicabo repudiandae rerum id praesentium cumque et, labore a non quis modi. Iure suscipit placeat laudantium ex?</p>'
    )

    // 4. Tentar enviar o formulário sem selecionar skills
    await page.click('button:has-text("Enviar")')

    // 5. Verificar se aparece uma mensagem de erro
    await expect(
      page.locator('text=Adicione ao menos uma habilidade.')
    ).toBeVisible()

    // 6. Agora, selecionar uma skill
    await page.click('text=TypeScript, React, .NET')
    await page.waitForTimeout(2000)
    await page.keyboard.type('React')
    await page.keyboard.press('Enter')
    await page.click('text=Quais habilidades são necessárias para a vaga?')

    // 7. Enviar o formulário novamente
    await page.click('button:has-text("Enviar")')

    // 8. Verificar se foi redirecionado para a página da vaga
    await expect(page).toHaveURL(/\/vaga\/[a-f0-9-]+/)

    // 9. Verificar se a vaga foi criada corretamente
    await expect(page.locator('[data-testid="role-title"]')).toContainText(
      'Desenvolvedor React'
    )
    await expect(page.locator('[data-testid="role-company"]')).toContainText(
      'Empresa Teste'
    )
    await page.waitForTimeout(2000)

    // 10. Navegar para o dashboard
    await page.goto('/vagas/publique')
    await page.reload({ timeout: 10000, waitUntil: 'networkidle' })
    await page.waitForTimeout(4000)
    await page.click('text=Ir para o Dashboard')

    // 11. Verificar se a vaga aparece no dashboard
    await expect(page.locator('[data-testid="dashboard-title"]')).toContainText(
      'Dashboard de Vagas'
    )
    await expect(page.locator('[data-testid="job-card-title"]')).toContainText(
      'Desenvolvedor React'
    )
    await expect(
      page.locator('[data-testid="job-card-company"]')
    ).toContainText('Empresa Teste')

    // 12. Clicar na vaga no dashboard e verificar se leva à página da vaga em uma nova aba
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=Desenvolvedor React'),
    ])

    await newPage.waitForLoadState('networkidle')

    await expect(newPage).toHaveURL(/\/vaga\/[0-9a-fA-F-]{36}/)

    await expect(newPage.locator('[data-testid="role-title"]')).toContainText(
      'Desenvolvedor React'
    )
    await expect(newPage.locator('[data-testid="role-company"]')).toContainText(
      'Empresa Teste'
    )
  })
})
