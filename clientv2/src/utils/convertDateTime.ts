export default function convertDateTime(epoch: number) {
  const d = new Date(0)
  d.setUTCSeconds(epoch)

  const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return longEnUSFormatter.format(d)
}
