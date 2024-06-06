import { Draggable, Droppable } from 'react-beautiful-dnd'

import { useRouter } from 'next/navigation'

import ProjectDetailTaskCard from '@/components/card/project/detail/ProjectDetailTaskCard'
import {
  PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE,
} from '@/constant/constant'
import { ROUTE_PROJECT } from '@/constant/route/route-constant'
import { type ProjectDetailTaskColumnProps } from '@/types/pageType'

export default function ProjectDetailTaskColumn(props: ProjectDetailTaskColumnProps) {
  const router = useRouter()
  const mainColor = () => {
    switch (props.columnTitle) {
      case PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE:
        return {
          textColor: 'text-[rgb(237,206,72)]',
          bgColor: 'bg-[rgb(237,206,72)]',
        }
      case PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE:
        return {
          textColor: 'text-[rgb(98,214,124)]',
          bgColor: 'bg-[rgb(98,214,124)]',
        }
      case PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE:
        return {
          textColor: 'text-[rgb(72,160,240)]',
          bgColor: 'bg-[rgb(72,160,240)]',
        }
      case PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE:
        return {
          textColor: 'text-[rgb(221,109,96)]',
          bgColor: 'bg-[rgb(221,109,96)]',
        }
      default:
        return {
          textColor: 'text-[rgb(237,206,72)]',
          bgColor: 'bg-[rgb(237,206,72)]',
        }
    }
  }
  const convertDate = (inputDate: string) => {
    const date = new Date(inputDate)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}.${month}.${day}`
  }
  const handleClickIssue = (id: number) => {
    router.push(`${ROUTE_PROJECT}/task/${id}`)
  }

  return (
    <div className={`${props.columnColor} p-2 rounded-lg col-span-1`}>
      <div className="flex flex-row justify-around w-full lg:w-2/5">
        <span className="font-bold text-black">{props.columnTitle}</span>
        <span className={`font-bold ${mainColor().textColor}`}>{props.cardList.length}</span>
      </div>

      <Droppable droppableId={`column-${props.columnTitle}`} direction="vertical" type="CARD">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`column-${props.columnTitle}`}
          >
            {props.cardList.map((data, index) => (
              <Draggable
                draggableId={`task-${data.title}`}
                index={index}
                key={`task-${data.title}`}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => {
                      handleClickIssue(data.id)
                    }}
                  >
                    <ProjectDetailTaskCard
                      title={data.title}
                      time={`${convertDate(data.startAt)}-${convertDate(data.endAt)}`}
                      cardColor={mainColor().bgColor}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
