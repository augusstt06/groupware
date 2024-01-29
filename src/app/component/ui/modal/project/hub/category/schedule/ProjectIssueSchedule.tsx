'use client'

import { type ChangeEvent, useEffect, useRef, useState } from 'react'

import moment from 'moment'

import Dialog, { DialogCalendar } from '../../../../dialog/Dialog'
import {
  IssueCalendarWithTime,
  IssueDescription,
  IssueInput,
  IssueSelect,
} from '../components/ProjectIssueComponent'

import {
  PROJECT_DATE_FORMAT,
  PROJECT_ISSUE_SCEDULE_END,
  PROJECT_ISSUE_SCEDULE_END_TITLE,
  PROJECT_ISSUE_SCEDULE_START,
  PROJECT_ISSUE_SCEDULE_START_TITLE,
  PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_EN,
  PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_EN,
  PROJECT_ISSUE_SCHEDULE_VALUE,
} from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import {
  changeIssueCategoryReducer,
  changeIssueDescriptionReducer,
  changeIssueEndAtReducer,
  changeIssueEndAtTimeReducer,
  changeIssueStartAtReducer,
  changeIssueStartAtTimeReducer,
  changeIssueTitleReducer,
} from '@/app/store/reducers/project/projectIssueReducer'
import { type DialogBtnValueType } from '@/app/types/moduleTypes'
import { type CalendarValue, type ValuePiece } from '@/app/types/pageTypes'
import { type DialogTextType, type ScheduleListType } from '@/app/types/variableTypes'

export default function ProjectIssueSchedule() {
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
  const schedulePlaceInput = useInput('')
  const handleChangePlace = (e: ChangeEvent<HTMLInputElement>) => {
    schedulePlaceInput.onChange(e)
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
      timeCategory: PROJECT_ISSUE_SCEDULE_START,
      openCalendar: handleOpenStartCalendar,
      calendarDateValue: startDate,
      onDateChange: handleStartDate,
      hoursList: hourList,
      handleSelectTime: handleSelectTimes,
      viewCheckAllDay: true,
      isCheckAllday: isAllday,
      handleAllday: handleChangeAllday,
      timeState: selectTime.start,
      dialog: startDialogRef,
    },
    {
      title: PROJECT_ISSUE_SCEDULE_END_TITLE,
      timeCategory: PROJECT_ISSUE_SCEDULE_END,
      openCalendar: handleOpenEndCalendar,
      calendarDateValue: endDate,
      onDateChange: handleEndDate,
      hoursList: hourList,
      handleSelectTime: handleSelectTimes,
      viewCheckAllDay: false,
      handleAllday: handleChangeAllday,
      timeState: selectTime.end,
      isCheckAllday: isAllday,
      dialog: endDialogRef,
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
      <div className="mt-2 p-2 mb-2">
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
          <div key={data.title}>
            <IssueCalendarWithTime scheduleData={data} />
            <DialogCalendar dialog={data.dialog} calendarWithTimeData={data} isWithtime={true} />
          </div>
        ))}
        <IssueInput
          title="장소"
          placeholder="장소를 입력해 주세요."
          value={schedulePlaceInput.value}
          onChange={handleChangePlace}
        />
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
    </>
  )
}
