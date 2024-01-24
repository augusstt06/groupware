import { DragDropContext, Draggable, Droppable, type DropResult } from 'react-beautiful-dnd'

import ProjectDetailTaskCard from '@/app/component/ui/card/project/detail/ProjectDetailTaskCard'
import { type ProjectDetailTaskColumnProps } from '@/app/types/pageTypes'

export default function ProjectDetailTaskColumn(props: ProjectDetailTaskColumnProps) {
  const onDragEnd = (result: DropResult) => {
    if (result.destination == null) return

    const newCardList = Array.from(props.cardList)
    const [movedCard] = newCardList.splice(result.source.index, 1)
    newCardList.splice(result.destination.index, 0, movedCard)

    props.setCardList(newCardList)
  }
  return (
    <div className={`${props.columnColor} p-2 rounded-lg col-span-1`}>
      <div className="w-2/5 flex flex-row justify-around">
        <span className="font-bold">{props.columnTitle}</span>
        <span className={`font-bold text-${props.cardColor}`}>{props.columnCardNumber}</span>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="task-board" direction="vertical">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.cardList.map((data, index) => (
                <Draggable draggableId={`task-${data.title}`} index={index} key={data.title}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ProjectDetailTaskCard
                        title={data.title}
                        time={data.time}
                        cardColor={props.cardColor}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
