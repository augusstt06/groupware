const convertTime = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000)
  const dateString = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const [datePart, timePart] = dateString.split(', ')

  const formattedDate = datePart.replace(/[-:\s]/g, '/')
  const formattedTime = timePart

  return `${formattedDate} ${formattedTime}`
}

export default convertTime
