export const formatDate = (
  date: Date | string,
  opts: Intl.DateTimeFormatOptions = {}
) => {
  return new Intl.DateTimeFormat('pt-BR', {
    ...opts
  }).format(new Date(date))
}
