import { getCookie } from 'cookies-next'

import Hub from '../component/page/main/Hub'
import { InputLabel } from '../component/ui/label/Inputlabel'

export default function Main() {
  const token = getCookie('access-token')
  return (
    <>
      {token !== undefined ? (
        <main className="flex flex-col justify-start items-left h-4/5 pl-10 pr-10 pt-10">
          <InputLabel title="Current Post" />
          <br />
          <Hub />
        </main>
      ) : (
        <main className="flex flex-col justify-center items-center h-2/5 pl-10 pr-10 pt-10">
          <h2>Please login</h2>
        </main>
      )}
    </>
  )
}
