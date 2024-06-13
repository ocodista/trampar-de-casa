export const updateSearchParams = (filters) => {
  const searchParams = new URLSearchParams(window.location.search)

  filters.forEach((filter) => {
    const filterValue = filter.option.value
    if (filter.inputType === 'order') {
      searchParams.set(filter.inputType, filterValue)
    } else {
      const existingFilter = searchParams.get(filter.inputType)

      if (!existingFilter || !existingFilter.includes(filterValue)) {
        const updatedValue = existingFilter
          ? `${existingFilter} ${filterValue}`
          : filterValue
        searchParams.set(filter.inputType, updatedValue)
      }
    }
  })

  return searchParams.toString()
}
