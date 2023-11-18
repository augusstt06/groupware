import { type SidebarProps } from '@/app/types/ui/uiTypes'

export default function Sidebar(props: SidebarProps) {
  const menu = [
    { name: 'menu1', url: '/' },
    { name: 'menu2', url: '/' },
    { name: 'menu3', url: '/' },
  ]
  return (
    <aside
      className={` ${props.nav ? ' md:block' : 'hidden'} w-64  bg-indigo-500 dark:bg-[#24292F]/90`}
    >
      <div className="p-6">
        <a
          href=""
          className="flex items-center text-white text-3xl font-semibold hover:text-gray-300"
        >
          Menu
        </a>
      </div>
      <nav className={'block text-base text-white font-semibold pt-3 dark:hover:text-bold '}>
        {menu.map((data) => (
          <a
            key={data.name}
            href=""
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 dark:hover:text-indigo-500"
          >
            {data.name}
          </a>
        ))}
      </nav>
    </aside>
  )
}
