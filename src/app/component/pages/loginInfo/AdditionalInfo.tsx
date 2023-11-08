import { AiFillPhone } from 'react-icons/ai'
import { BsFillPersonVcardFill, BsMicrosoftTeams } from 'react-icons/bs'

import InfoInput from '../../ui/input/info/infoInput'

export default function AdditionalInfo() {
  return (
    <>
      <InfoInput
        title="Name"
        placeholder="Min Yeon Kim"
        icon={<BsFillPersonVcardFill />}
        checkValid={false}
      />
      <InfoInput
        title="Teams"
        placeholder="프론트엔드 개발"
        icon={<BsMicrosoftTeams />}
        checkValid={false}
      />
      <InfoInput
        title="PhoneNumber"
        placeholder="010-0000-0000"
        icon={<AiFillPhone />}
        checkValid={true}
      />
    </>
  )
}
