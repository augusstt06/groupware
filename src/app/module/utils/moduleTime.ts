import { addSeconds, format, parse } from 'date-fns'

export const moduleConvertTime = (input: string): string => {
  const date: Date = parse(input, 'yyyy/MM/dd/HH:mm', new Date())
  const dateWithSeconds: Date = addSeconds(date, 5)
  const outputString: string = format(dateWithSeconds, "yyyy-MM-dd'T'HH:mm:ss'Z'", {
    locale: undefined,
  })

  return outputString
}

export const moduleGetCurrentTime = (): string => {
  const currentTime = new Date()
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const formattedTime = formatter.format(currentTime)
  return formattedTime
}

export const moduleConvertDate = (date: string, division: string, isTime: boolean) => {
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')

  if (isTime) {
    return `${year}${division}${month}${division}${day} ${hours}:${minutes}`
  }
  return `${year}${division}${month}${division}${day}`
}
