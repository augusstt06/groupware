'use client'

import { type ChangeEvent, useEffect, useRef, useState } from 'react'

import moment from 'moment'

import ModalHub from '../../../../Modal'
import Dialog, { DialogCalendar } from '../../../../dialog/Dialog'
import {
  IssueCalendarWithTime,
  IssueDescription,
  IssueInput,
  IssueSelect,
} from '../components/ProjectIssueComponent'

import SchedulePlace from './SchedulePlace'

import Input from '@/_component/input/Input'
import {
  MODAL_BTN_SELECT,
  PROJECT_DATE_FORMAT,
  PROJECT_ISSUE_SCEDULE_END,
  PROJECT_ISSUE_SCEDULE_END_TITLE,
  PROJECT_ISSUE_SCEDULE_START,
  PROJECT_ISSUE_SCEDULE_START_TITLE,
  PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_EN,
  PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_EN,
  PROJECT_ISSUE_SCHEDULE_VALUE,
} from '@/constant/constant'
import useInput from '@/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/module/hooks/reduxHooks'
import {
  changeIssueCategoryReducer,
  changeIssueDescriptionReducer,
  changeIssueEndAtReducer,
  changeIssueEndAtTimeReducer,
  changeIssuePlaceReducer,
  changeIssueStartAtReducer,
  changeIssueStartAtTimeReducer,
  changeIssueTitleReducer,
} from '@/store/reducers/project/projectIssueReducer'
import { type DialogBtnValueType } from '@/types/module'
import { type CalendarValue, type ValuePiece } from '@/types/pageType'
import { type SearchType } from '@/types/ui/modal'
import { type DialogTextType, type ScheduleListType } from '@/types/variable'

export default function ProjectIssueSchedule() {
  const [isPlaceModal, setIsPlaceModal] = useState(false)
  const handlePlaceModal = () => {
    setIsPlaceModal(!isPlaceModal)
  }
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const startDialogRef = useRef<HTMLDialogElement | null>(null)
  const endDialogRef = useRef<HTMLDialogElement | null>(null)
  const [dialogText, setDialogText] = useState<DialogTextType>({
    main: '',
    sub: '',
  })
  const handleDialogClose = () => {
    dialogRef.current?.close()
  }
  const [projectDialogBtnValue] = useState<DialogBtnValueType>({
    isCancel: false,
    cancleFunc: () => {},
    cancelText: '',
    confirmFunc: handleDialogClose,
    confirmText: '확인',
  })
  const dispatch = useAppDispatch()
  const scheduleTitleInput = useInput('')
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeIssueTitleReducer(e.target.value))
    scheduleTitleInput.onChange(e)
  }

  const [schedulePlace, setSchedulePlace] = useState('')
  const [selectedPlace, setSelectedPlace] = useState<SearchType | null>(null)

  const handlePlaceSelection = () => {
    if (selectedPlace != null) {
      setSchedulePlace(selectedPlace.place_name)
      dispatch(changeIssuePlaceReducer(selectedPlace.place_name))
      handlePlaceModal()
    }
  }

  const scheduleDescriptionInput = useInput('')
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeIssueDescriptionReducer(e.target.value))
    scheduleDescriptionInput.onChange(e)
  }
  const [selectTime, setSelectTime] = useState({
    start: { hour: '00', minute: '00' },
    end: { hour: '00', minute: '00' },
  })
  const attendanceList = ['김충연', '김민규', '남아현', '오준석']
  const [startDate, setStartDate] = useState<CalendarValue>(new Date())
  const [endDate, setEndDate] = useState<CalendarValue>(new Date())
  const [isAllday, setIsAllDay] = useState<boolean>(false)
  const handleChangeAllday = () => {
    setIsAllDay(!isAllday)
  }

  const handleOpenStartCalendar = () => {
    startDialogRef.current?.showModal()
  }
  const handleOpenEndCalendar = () => {
    endDialogRef.current?.showModal()
  }

  const handleStartDate = (date: CalendarValue) => {
    if (moment(endDate as ValuePiece).isBefore(date as ValuePiece)) {
      setDialogText({
        main: '시작일은 마감일보다 늦을수 없습니다.',
        sub: '',
      })
      dialogRef.current?.showModal()
      return
    }
    const stringDate = moment(date as ValuePiece).format(PROJECT_DATE_FORMAT)
    dispatch(changeIssueStartAtReducer(stringDate))
    setStartDate(date)
    startDialogRef.current?.close()
  }

  const handleEndDate = (date: CalendarValue) => {
    if (moment(startDate as ValuePiece).isAfter(date as ValuePiece)) {
      setDialogText({
        main: '시작일은 마감일보다 늦을수 없습니다.',
        sub: '',
      })
      dialogRef.current?.showModal()
      return
    }
    const stringDate = moment(date as ValuePiece).format(PROJECT_DATE_FORMAT)
    dispatch(changeIssueEndAtReducer(stringDate))
    setEndDate(date)
    endDialogRef.current?.close()
  }

  const setInitialDate = () => {
    const startStringDate = moment(startDate as ValuePiece).format(PROJECT_DATE_FORMAT)
    dispatch(changeIssueStartAtReducer(startStringDate))
    const endStringDate = moment(endDate as ValuePiece).format(PROJECT_DATE_FORMAT)
    dispatch(changeIssueEndAtReducer(endStringDate))
    const times = [
      { units: 'hour', timeValue: '00' },
      { units: 'minute', timeValue: '00' },
    ]
    times.forEach((data) => {
      dispatch(
        changeIssueStartAtTimeReducer({
          units: data.units as 'hour' | 'minute',
          timeValue: data.timeValue,
        }),
      )
      dispatch(
        changeIssueEndAtTimeReducer({
          units: data.units as 'hour' | 'minute',
          timeValue: data.timeValue,
        }),
      )
    })
  }

  const hourList = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, '0')
    return hour
  })

  const minuteList = Array.from({ length: 60 }, (_, index) => {
    const minute = index.toString().padStart(2, '0')
    return minute
  })

  const handleSelectTimes = (type: 'start' | 'end', unit: 'hour' | 'minute', value: string) => {
    setSelectTime((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [unit]: value,
      },
    }))

    if (type === 'start') {
      dispatch(
        changeIssueStartAtTimeReducer({
          units: unit,
          timeValue: value,
        }),
      )
    } else {
      dispatch(
        changeIssueEndAtTimeReducer({
          units: unit,
          timeValue: value,
        }),
      )
    }
  }
  const scheduleList: ScheduleListType[] = [
    {
      title: PROJECT_ISSUE_SCEDULE_START_TITLE,
      defaultEndTime: { hour: '00', minute: '00' },
      defaultStartTime: { hour: '00', minute: '00' },
      timeCategory: PROJECT_ISSUE_SCEDULE_START,
      openCalendar: handleOpenStartCalendar,
      calendarDateValue: startDate,
      onDateChange: handleStartDate,
      hoursList: hourList,
      minutesList: minuteList,
      handleSelectTime: handleSelectTimes,
      viewCheckAllDay: true,
      isCheckAllday: isAllday,
      handleAllday: handleChangeAllday,
      timeState: selectTime.start,
      dialog: startDialogRef,
    },
    {
      title: PROJECT_ISSUE_SCEDULE_END_TITLE,
      defaultEndTime: { hour: '00', minute: '00' },
      defaultStartTime: { hour: '00', minute: '00' },
      timeCategory: PROJECT_ISSUE_SCEDULE_END,
      openCalendar: handleOpenEndCalendar,
      calendarDateValue: endDate,
      onDateChange: handleEndDate,
      hoursList: hourList,
      minutesList: minuteList,
      handleSelectTime: handleSelectTimes,
      viewCheckAllDay: false,
      handleAllday: handleChangeAllday,
      timeState: selectTime.end,
      isCheckAllday: isAllday,
      dialog: endDialogRef,
    },
  ]

  const placeModal = [
    {
      onClose: handlePlaceModal,
      isModalOpen: isPlaceModal,
      childComponent: (
        <SchedulePlace schedulePlace={schedulePlace} setSelectedPlace={setSelectedPlace} />
      ),
      name: 'schedule-place',
      btnValue: MODAL_BTN_SELECT,
      confirmFunc: handlePlaceSelection,
    },
  ]
  useEffect(() => {
    dispatch(changeIssueCategoryReducer(PROJECT_ISSUE_SCHEDULE_VALUE.toUpperCase()))
    dispatch(changeIssueTitleReducer(''))
    setInitialDate()

    if (isAllday) {
      setEndDate(startDate)
      const stringStartDate = moment(startDate as ValuePiece).format(PROJECT_DATE_FORMAT)
      dispatch(changeIssueStartAtReducer(stringStartDate))
      dispatch(changeIssueEndAtReducer(stringStartDate))

      setSelectTime({
        start: { hour: '00', minute: '00' },
        end: { hour: '23', minute: '59' },
      })
      const times = [
        {
          reducer: changeIssueStartAtTimeReducer,
          units: PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_EN as 'hour',
          timeValue: '00',
        },
        {
          reducer: changeIssueStartAtTimeReducer,
          units: PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_EN as 'minute',
          timeValue: '00',
        },
        {
          reducer: changeIssueEndAtTimeReducer,
          units: PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_EN as 'hour',
          timeValue: '23',
        },
        {
          reducer: changeIssueEndAtTimeReducer,
          units: PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_EN as 'minute',
          timeValue: '59',
        },
      ]
      times.forEach((data) =>
        dispatch(
          data.reducer({
            units: data.units,
            timeValue: data.timeValue,
          }),
        ),
      )
    }
  }, [isAllday])
  return (
    <>
      <div className="p-2 mt-2 mb-2">
        <span className="font-bold">일정 생성하기</span>
      </div>
      <div>
        <IssueInput
          title="제목"
          placeholder="제목을 입력해 주세요."
          value={scheduleTitleInput.value}
          onChange={handleChangeTitle}
        />
        <IssueSelect title="참석자" selectList={attendanceList} />
        {scheduleList.map((data) => (
          <div key={data.title as string}>
            <IssueCalendarWithTime scheduleData={data} />
            <DialogCalendar dialog={data.dialog} calendarWithTimeData={data} isWithtime={true} />
          </div>
        ))}
        <div className="p-2 sort-row-flex">
          <Input
            readOnly
            placeholder="장소를 검색해주세요."
            onClick={handlePlaceModal}
            isLabel={true}
            labelContent="장소"
            value={schedulePlace}
            labelClassName="w-1/6"
            className=" xl:w-3/5 rounded mt-2 text-gray-900 block text-sm p-2.5 dark:placeholder-gray-400 dark:text-white focus:outline-none bg-transparent border-2 border-indigo-200 dark:border-indigo-300"
          />
        </div>

        <IssueDescription
          value={scheduleDescriptionInput.value}
          onChange={handleChangeDescription}
        />
      </div>
      <Dialog
        dialog={dialogRef}
        dialogAlertText={dialogText}
        dialogBtnValue={projectDialogBtnValue}
      />
      <ModalHub modals={placeModal} />
    </>
  )
}
