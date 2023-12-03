import AttendanceInput from '@/app/component/ui/input/main/MainInput'
import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/cookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'

export default function CreateProject() {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const userInfo = useAppSelector((state) => state.userInfo)
  const titleInput = { title: 'Title', description: 'groupware', input: useInput('') }
  const descriptionInput = {
    title: 'Description',
    description: 'project for create groupware',
    input: useInput(''),
  }
  const projectIdInput = { title: 'Team Id', description: '1', input: useInput('') }

  const fetchCreateProject = async () => {
    try {
      const fetchCreateProject: ModulePostFetchProps = {
        data: {
          description: descriptionInput.input.value,
          title: titleInput.input.value,
          projectId: projectIdInput.input.value,
        },
        fetchUrl: process.env.NEXT_PUBLIC_CREATE_PROJECTS_SOURCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }
      await modulePostFetch(fetchCreateProject)
      //   console.log(res)
    } catch (err) {
      //   console.log(err)
    }
  }
  const handleClick = () => {
    void fetchCreateProject()
  }
  return (
    <div className="col-span-2">
      <h2 className="text-center text-bold text-xl mb-5">Create Project</h2>
      <AttendanceInput
        type="project"
        title={titleInput.title}
        input={titleInput.input}
        placeholder={titleInput.description}
      />
      <AttendanceInput
        type="project"
        title={descriptionInput.title}
        input={descriptionInput.input}
        placeholder={descriptionInput.description}
      />
      <AttendanceInput
        type="project"
        title={projectIdInput.title}
        input={projectIdInput.input}
        placeholder={projectIdInput.description}
      />

      <div className="text-center mt-10">
        <button
          className="w-2/5 justify-center text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
          onClick={handleClick}
        >
          Create
        </button>
      </div>
    </div>
  )
}
