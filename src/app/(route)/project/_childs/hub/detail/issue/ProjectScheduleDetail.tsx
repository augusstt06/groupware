import { type ChangeEvent, useEffect, useRef, useState } from 'react'

import moment from 'moment'
import { BsAlignEnd, BsAlignStart } from 'react-icons/bs'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { IoLocationOutline, IoPersonOutline } from 'react-icons/io5'

import Dialog, { DialogCalendar } from '@/_component/modal/dialog/Dialog'
import { IssueTime } from '@/_component/modal/project/hub/category/components/ProjectIssueComponent'
import { KaKaoMap } from '@/_component/modal/project/hub/category/schedule/SchedulePlace'
import {
  KAKAO_AUTH_KEY,
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
  PROJECT_DATE_FORMAT,
  PROJECT_ISSUE_SCEDULE_END,
  PROJECT_ISSUE_SCEDULE_START,
  PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_EN,
  PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO,
  PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_EN,
  PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_KO,
  PROJECT_ISSUE_SCHEDULE_VALUE,
} from '@/constant/constant'
import { API_URL_KAKAO_MAP, API_URL_PROJECT_ISSUE } from '@/constant/route/api-route-constant'
import { useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/module/utils/moduleCookie'
import { moduleKaKaoGetFetch, modulePatchFetch } from '@/module/utils/moduleFetch'
import { type DialogBtnValueType, type ModulePostFetchProps } from '@/types/module'
import {
  type CalendarValue,
  type IssueCalendarWithTimeProps,
  type ProjectIssueDetailProps,
  type ValuePiece,
} from '@/types/pageType'
import { type SearchType } from '@/types/ui/modal'
import { type DialogTextType, type ScheduleListType } from '@/types/variable'

export default function ProjectScheduleDeatil(props: ProjectIssueDetailProps) {
  const { issue } = props
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [searchInput, setSearchInput] = useState<SearchType[]>([])
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
  const [startIssueHour, startIssueMinute] =
    issue !== null ? issue?.startAt.slice(11, 16).split(':') : ['0', '0']
  const [endIssueHour, endIssueMinute] =
    issue !== null ? issue?.endAt.slice(11, 16).split(':') : ['0', '0']

  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const startDialogRef = useRef<HTMLDialogElement | null>(null)
  const endDialogRef = useRef<HTMLDialogElement | null>(null)
  const [startDate, setStartDate] = useState<CalendarValue>(new Date(issue?.startAt as string))
  const [endDate, setEndDate] = useState<CalendarValue>(new Date(issue?.endAt as string))

  const [selectTime, setSelectTime] = useState({
    start: { hour: startIssueHour, minute: startIssueMinute },
    end: { hour: endIssueHour, minute: endIssueMinute },
  })

  const handleSelectTimes = (type: 'start' | 'end', unit: 'hour' | 'minute', value: string) => {
    setSelectTime((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [unit]: value,
      },
    }))
  }

  const hourList = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, '0')
    return hour
  })
  const minuteList = Array.from({ length: 60 }, (_, index) => {
    const minute = index.toString().padStart(2, '0')
    return minute
  })
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
    setEndDate(date)
    endDialogRef.current?.close()
  }

  const scheduleList: ScheduleListType[] = [
    {
      keyValue: 'start',
      title: <BsAlignStart className="w-5 h-5 mr-5" />,
      defaultStartTime: { hour: startIssueHour, minute: startIssueMinute },
      defaultEndTime: { hour: endIssueHour, minute: endIssueMinute },
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
      keyValue: 'end',
      title: <BsAlignEnd className="w-5 h-5 mr-5" />,
      defaultStartTime: { hour: startIssueHour, minute: startIssueMinute },
      defaultEndTime: { hour: endIssueHour, minute: endIssueMinute },
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

  const convertDateWithTIme = (date: string, hour: string, minute: string) => {
    return new Date(`${date}T${hour}:${minute}:00Z`).toISOString()
  }
  const fetchPatchScheduleIssue = async () => {
    const fetchProps: ModulePostFetchProps = {
      data: {
        category: PROJECT_ISSUE_SCHEDULE_VALUE.toUpperCase(),
        description: '',
        endAt: convertDateWithTIme(
          moment(endDate as ValuePiece).format(PROJECT_DATE_FORMAT),
          selectTime.end.hour,
          selectTime.end.minute,
        ),
        startAt: convertDateWithTIme(
          moment(startDate as ValuePiece).format(PROJECT_DATE_FORMAT),
          selectTime.start.hour,
          selectTime.start.minute,
        ),
        issueId: issue?.id,
        title: issue?.title,
      },
      fetchUrl: API_URL_PROJECT_ISSUE,
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    }
    await modulePatchFetch<string>(fetchProps)
  }

  const fetchMap = async () => {
    const res = await moduleKaKaoGetFetch({
      params: {
        query: issue?.location as string,
      },
      fetchUrl: API_URL_KAKAO_MAP,
      header: {
        Authorization: `KakaoAK ${KAKAO_AUTH_KEY}`,
      },
    })
    setSearchInput(res.documents.filter((data) => data.place_name === issue?.location))
  }
  useEffect(() => {
    void fetchMap()
  }, [])
  useEffect(() => {
    if (isAllday) {
      setSelectTime({
        start: {
          hour: '00',
          minute: '00',
        },
        end: {
          hour: '23',
          minute: '59',
        },
      })
    }
    void fetchPatchScheduleIssue()
  }, [isAllday, startDate, endDate, selectTime])

  return (
    <>
      <div className="flex flex-col items-start mt-5">
        <div className="flex flex-row items-center justify-start w-2/3">
          <IoPersonOutline className="w-5 h-5 mr-5" />
          <div className="w-16 p-2">{issue?.issuer.name}</div>
        </div>
      </div>
      <div className="flex flex-col items-start mt-5">
        {scheduleList.map((data) => (
          <div className="flex flex-row items-center justify-start w-2/3" key={data.keyValue}>
            <DetailCalendarTime scheduleData={data} />
            <DialogCalendar dialog={data.dialog} calendarWithTimeData={data} isWithtime={true} />
          </div>
        ))}
        <div className="flex flex-row items-start mt-5 mb-5">
          <IoLocationOutline className="w-5 h-5 mr-5" />
          <span>{searchInput.length !== 0 ? searchInput[0].place_name : ''}</span>
        </div>
        <KaKaoMap searchData={searchInput} />
        <Dialog
          dialog={dialogRef}
          dialogAlertText={dialogText}
          dialogBtnValue={projectDialogBtnValue}
        />
      </div>
    </>
  )
}

export function DetailCalendarTime(props: IssueCalendarWithTimeProps) {
  const issueTimeList = [
    {
      timeCategory: props.scheduleData.timeCategory,
      defaultStartTime: props.scheduleData.defaultStartTime,
      defaultEndTime: props.scheduleData.defaultEndTime,
      viewCheckAllDate: props.scheduleData.viewCheckAllDay,
      timeState: props.scheduleData.timeState,
      hoursList: props.scheduleData.hoursList,
      minutesList: props.scheduleData.minutesList,
      unit: PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO,
      isCheckAllday: props.scheduleData.isCheckAllday,
      onChange: (e: ChangeEvent<HTMLSelectElement>) => {
        props.scheduleData.handleSelectTime(
          props.scheduleData.timeCategory,
          PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_EN,
          e.target.value,
        )
      },
    },
    {
      timeCategory: props.scheduleData.timeCategory,
      defaultStartTime: props.scheduleData.defaultStartTime,
      defaultEndTime: props.scheduleData.defaultEndTime,
      viewCheckAllDate: props.scheduleData.viewCheckAllDay,
      timeState: props.scheduleData.timeState,
      hoursList: props.scheduleData.hoursList,
      minutesList: props.scheduleData.minutesList,
      unit: PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_KO,
      isCheckAllday: props.scheduleData.isCheckAllday,
      onChange: (e: ChangeEvent<HTMLSelectElement>) => {
        props.scheduleData.handleSelectTime(
          props.scheduleData.timeCategory,
          PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_EN,
          e.target.value,
        )
      },
    },
  ]

  const renderTitle = () => {
    if (props.scheduleData.title === '') {
      return <></>
    }
    return (
      <div className="md:block hidden min-w-40 col-span-1">
        <span className="text-sm md:text-base">{props.scheduleData.title}</span>
      </div>
    )
  }
  return (
    <div className="flex flex-row items-center w-100">
      {renderTitle()}
      <div className="w-24 lg:w-36 flex flex-col lg:flex-row items-center rounded mt-2 bg-gray-50 border text-gray-900 text-sm border-gray-300 p-2 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white truncate ">
        <FaRegCalendarAlt onClick={props.scheduleData.openCalendar} className="mb-2 lg:mb-0" />
        <span className="ml-2 lg:text-base text-xs">
          {moment(props.scheduleData.calendarDateValue as ValuePiece).format('YYYY/MM/DD')}
        </span>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:w-44 w-24">
        {issueTimeList.map((data) => (
          <div key={data.unit} className="md:ml-3">
            <IssueTime
              timeCategory={data.timeCategory}
              defaultStartTime={props.scheduleData.defaultStartTime}
              defaultEndTime={props.scheduleData.defaultEndTime}
              viewCheckAllDay={data.viewCheckAllDate}
              timeState={data.timeState}
              hoursList={data.hoursList}
              minutesList={data.minutesList}
              unit={data.unit}
              onChange={data.onChange}
              isCheckAllday={data.isCheckAllday}
            />
          </div>
        ))}
      </div>
      {props.scheduleData.viewCheckAllDay === true ? (
        <div className="w-20 md:flex hidden items-center flex-row">
          <input type="checkbox" onClick={props.scheduleData.handleAllday} className="w-4 h-4" />
          <span className="text-sm ml-3">하루종일</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
