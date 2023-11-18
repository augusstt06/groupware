import { InputLabel } from '../../label/Inputlabel'

import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { deleteOrgTeamReducer } from '@/app/store/reducers/orgInfoReducer'

export default function OrgTeamTable() {
  const dispatch = useAppDispatch()
  const teamList: Array<{ name: string; description: string }> = useAppSelector(
    (state) => state.orgInfo.teams,
  )

  const handleDelete = (data: { name: string; description: string }) => {
    dispatch(deleteOrgTeamReducer(data))
  }
  return (
    <>
      <InputLabel title={'Team list'} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <table className="rounded-r-lg w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {teamList.map((data) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
                key={data.description}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.name}
                </th>
                <td className="px-6 py-4">{data.description}</td>
                <td className="px-6 py-4">
                  <a
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    onClick={() => {
                      handleDelete(data)
                    }}
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
