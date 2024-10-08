import GnbCategoryMenu from './menu/GnbCategoryMenu'
import GnbHamburgerMenu from './menu/NavHamburgerMenu'

import { type ResponsiveNavProps } from '@/types/ui/nav'

export default function ResponsiveNav(props: ResponsiveNavProps) {
  const {
    isDropOpen,
    setIsDropOpen,
    dropRef,
    handleOpenDialog,
    changeDialogConfirmFn,
    setIsUserStateOpen,
  } = props
  return (
    <div
      className={`${
        isDropOpen === true ? '' : 'hidden'
      }  backdrop-blur-lg md:backdrop-blur-none md:flex md:flex-row justify-center md:w-4/5 md:static md:border-none border-b border-1 dark:border-indigo-300 z-50 absolute top-14 left-0 right-0 flex flex-col `}
    >
      <div className="justify-center w-full sort-vertical-flex md:flex-row" ref={dropRef}>
        <GnbCategoryMenu
          handleClickDrop={() => {
            setIsDropOpen(false)
          }}
        />
        <GnbHamburgerMenu
          setIsUserStateOpen={setIsUserStateOpen}
          handleOpenDialog={handleOpenDialog}
          changeDialogConfirmFn={changeDialogConfirmFn}
        />
      </div>
    </div>
  )
}
