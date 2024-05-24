const attendancePath = [
  {
    source: process.env.NEXT_PUBLIC_ATTENDANCES_SOURCE,
    destination: process.env.NEXT_PUBLIC_ATTENDANCES_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_ATTENDANCES_HISTORY_SOURCE,
    destination: process.env.NEXT_PUBLIC_ATTENDANCES_HISTORY_DESTINATION,
  },
  {
    source: process.env.NEXT_PUBLIC_ATTENDANCES_VACATION_SOURCE,
    destination: process.env.NEXT_PUBLIC_ATTENDANCES_VACATION_DESTINATION,
  },
]

export default attendancePath
