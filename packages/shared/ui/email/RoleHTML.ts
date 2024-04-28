const SkillHTML = (
  skill: string
) => `<div style="margin-bottom: 0.25rem; white-space: nowrap; border-radius: 1rem; border-width: 2px; border-style: solid; border-color: rgb(0, 0, 0); background-color: rgb(228, 228, 231); padding: 0.375rem 1rem; font-size: 0.75rem; line-height: 1rem;">
            ${skill}
          </div>`

const LocationLanguage = ({
  location,
  language,
}: {
  location: string | null | undefined
  language: string | null | undefined
}) =>
  `<table
          align="center"
          width="100%"
          data-id="react-email-row"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="margin-top: 0.5rem; color: rgb(156, 163, 175);"
        >
          <tbody style="width: 100%;">
            <tr style="width: 100%;">
              <td
                align="left"
                data-id="__react-email-column"
                style="display: flex; align-items: center; font-size: 0.75rem; line-height: 1rem;"
              >
                ${
                  location
                    ? `📍
                <span style="margin-left: 0.25rem; margin-right: 1.5rem;">
                  ${location}
                </span>
                  `
                    : ''
                }
                💬
                <span style="margin-left: 0.25rem; margin-right: 0.25rem;">
                  ${language}
                </span>
              </td>
            </tr>
          </tbody>
        </table>`

interface IRoleHTML {
  company: string | null | undefined
  language: string | null | undefined
  headerInfo?: string | null | undefined
  location: string | null | undefined
  url: string | null | undefined
  title: string | null | undefined
  skills: Array<string> | null
  salary: string | null | undefined
}

export const RoleHTML = ({
  skills,
  company,
  headerInfo,
  title,
  location,
  language,
}: IRoleHTML) => {
  const firstSkills = skills?.slice(0, 4)
  return `<a
      href="https://elegant-shift.com/"
      target="_blank"
      rel="noreferrer"
      style="text-decoration: none; color: unset;"
    >
      <div style="margin-top: 1rem; margin-bottom: 1rem; cursor: pointer; border-radius: 0.375rem; border-width: 1px; border-style: solid; border-color: rgb(209, 213, 219); padding: 1rem; font-size: 0.875rem; line-height: 1.25rem;">
        <table
          align="center"
          width="100%"
          data-id="react-email-row"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
        >
          <tbody style="width: 100%;">
            <tr style="width: 100%;">
              <td
                align="left"
                data-id="__react-email-column"
                style="font-size: 0.75rem; line-height: 1rem; font-style: italic;"
              >
                ${company}
              </td>
              <td
                align="right"
                data-id="__react-email-column"
                style="font-size: 0.75rem; line-height: 1rem; font-style: italic;"
              >${headerInfo ?? ''}</td>
            </tr>
          </tbody>
        </table>
        <table
          align="center"
          width="100%"
          data-id="react-email-row"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
        >
          <tbody style="width: 100%;">
            <tr style="width: 100%;">
              <h1
                data-id="react-email-heading"
                style="font-size: 0.875rem; line-height: 1.25rem;"
              >
                ${title}
              </h1>
            </tr>
          </tbody>
        </table>
        <section style="display: flex; flex-wrap: wrap; column-gap: 0.5rem;">
        ${firstSkills
          ?.filter((skill) => Boolean(skill))
          .map((skill: string) => SkillHTML(skill))
          .join(' ')}
        </section>
        ${LocationLanguage({ location, language })}
      </div>
    </a>`
}
