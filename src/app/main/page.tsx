import Hub from '../component/page/main/Hub'
import { InputLabel } from '../component/ui/label/Inputlabel'

export default function Main() {
  return (
    <main className="flex flex-col justify-start items-left h-4/5 pl-10 pr-10 pt-10">
      <InputLabel title="Current Post" />
      <br />
      <Hub />
    </main>
  )
}
