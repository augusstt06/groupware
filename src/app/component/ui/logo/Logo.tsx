import Link from 'next/link'

export default function Logo() {
  return (
    <div className="avatar">
      <div className="rounded">
        <Link href="/">
          <h3 className="text-3xl text-indigo-500 font-bold">Logo</h3>
        </Link>
      </div>
    </div>
  )
}
