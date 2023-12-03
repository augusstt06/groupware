import { addSeconds, format, parse } from 'date-fns'

export const convertTime = (input: string): string => {
  const date: Date = parse(input, 'yyyy/MM/dd/HH:mm', new Date())
  const dateWithSeconds: Date = addSeconds(date, 5)
  const outputString: string = format(dateWithSeconds, "yyyy-MM-dd'T'HH:mm:ss'Z'", {
    locale: undefined,
  })

  return outputString
}

export const getCurrentTime = (): string => {
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
