// API resposne code
export const API_SUCCESS_CODE = 200

export const GET = 'GET'
export const POST = 'POST'
export const PATCH = 'PATCH'
export const DELETE = 'DELETE'
export const FETCH_CONTENT_TYPE = 'application/json'

export const TRUE = 'TRUE'
export const FALSE = 'FALSE'
export const PUBLIC = 'Public'
export const PRIVATE = 'Private'
export const COMPLETE = 'complete'

export const ORG_CREATE = 'create'
export const ORG_JOIN = 'join'
export const ORG_NEXT = 'Create Team'
export const ORG_CRAETE_NOTEAM = 'Create Organization without team'
export const ORG_SELECTBOX = 'selectbox'
export const ORG_GRADES = 'grades'

export const ORG_CREATETEAM = 'createTeam'

export const REGISTER_EMAIL = '이메일'
export const REGISTER_PWD = '비밀번호'
export const REGISTER_CONFIRM_PWD = '비밀번호 확인'
export const REGISTER_NAME = '이름'
export const REGISTER_PHONENUMBER = '전화번호'
export const REGISTER_POSITION = '직무'
export const REGISTER_ORG_NAME = '조직 이름'
export const REGISTER_ORG_DESCRIPTION = '조직설명'
export const REGISTER_ORG_JOIN = '조직 코드'

export const KEY_ACCESS_TOKEN = 'access-token'
export const KEY_REFRESH_TOKEN = 'refresh-token'
export const KEY_X_ORGANIZATION_CODE = 'X-ORGANIZATION-CODE'
export const KEY_UUID = 'uuid'
export const KEY_USER = 'user'
export const KEY_ORGANIZATION_COMPLETE = 'organization-complete'
export const KEY_ATTENDANCE = 'attendance'
export const KEY_LOGIN_COMPLETE = 'login-complete'

// Sidebar
export const SIDEBAR_URL_PATH_DEFAULT = '/'
export const SIDEBAR_URL_PATH_MAIN = 'main'
export const SIDEBAR_URL_PATH_BOARD = 'board'
export const SIDEBAR_URL_PATH_PROJECT = 'project'
export const SIDEBAR_URL_PATH_PROJECT_DETAIL = 'project/detail'

export const MAIN_CARD_TODO = 'TODO'

// Board
export const BOARD_CATEGORY_TEAM = '팀'
export const BOARD_CATEGORY_PROJECT = '프로젝트'

// Project
export const PROJECT_ISSUE_TASK_TITLE = '📑 업무'
export const PROJECT_ISSUE_SCHEDULE_TITLE = '🗓️ 일정'
export const PROJECT_ISSUE_TODO_TITLE = '✅ 할일'

export const PROJECT_ISSUE_TASK_VALUE = 'task'
export const PROJECT_ISSUE_SCHEDULE_VALUE = 'schedule'
export const PROJECT_ISSUE_TODO_VALUE = 'todo'

// RED, PINK, GREEN, BLUE, PURPLE, YELLOW
export const PROJECT_CARD_RES_COLOR_RED = 'RED'
export const PROJECT_CARD_RES_COLOR_PINK = 'PINK'
export const PROJECT_CARD_RES_COLOR_GREEN = 'GREEN'
export const PROJECT_CARD_RES_COLOR_BLUE = 'BLUE'
export const PROJECT_CARD_RES_COLOR_PURPLE = 'PURPLE'
export const PROJECT_CARD_RES_COLOR_YELLOW = 'YELLOW'

export const PROJECT_CARD_REAL_COLOR_RED = 'bg-[rgb(240,185,185)]'
export const PROJECT_CARD_REAL_COLOR_PINK = 'bg-[rgb(228,177,227)]'
export const PROJECT_CARD_REAL_COLOR_GREEN = 'bg-[rgb(170,230,200)]'
export const PROJECT_CARD_REAL_COLOR_BLUE = 'bg-[rgb(170,220,240)]'
export const PROJECT_CARD_REAL_COLOR_PURPLE = 'bg-[rgb(207,183,242)]'
export const PROJECT_CARD_REAL_COLOR_YELLOW = 'bg-[rgb(240,210,190)]'

export const PROJECT_SIDEBAR_MENU_ALL = '전체'
export const PROJECT_SIDEBAR_MENU_PARTICIPATING = '참여중인 프로젝트'
export const PROJECT_SIDEBAR_MENU_IMPORTANT = '중요 프로젝트'

// export const PROJECT_MAIN_CATEGORY_ALL = 'all'
// export const PROJECT_MAIN_CATEGORY_PARTICIPATING = 'participating'
// export const PROJECT_MAIN_CATEGORY_IMPORTANT = 'important'

export const PROJECT_MAIN_CATEGORY_ALL = '전체'
export const PROJECT_MAIN_CATEGORY_INCLUDED = '참여중인 프로젝트'
export const PROJECT_MAIN_CATEGORY_STARRED = '중요 프로젝트'

export const PROJECT_DETAIL_CATEGORY_HOME = '홈'
export const PROJECT_DETAIL_CATEGORY_TASK = '업무'
export const PROJECT_DETAIL_CATEGORY_CALENDAR = '일정'
export const PROJECT_DETAIL_CATEGORY_TODO = '할일'

export const PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE = '요청'
export const PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_VALUE = 'REQUESTED'
export const PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_COLOR = 'bg-[rgb(248,216,73)]'
export const PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_HOVER_COLOR =
  'hover:bg-[rgb(248,216,73)] dark:hover:bg-[rgb(248,216,73)]'

export const PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE = '진행'
export const PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_VALUE = 'PROCESSING'
export const PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_COLOR = 'bg-[rgb(98,214,124)]'
export const PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_HOVER_COLOR =
  'hover:bg-[rgb(98,214,124)] dark:hover:bg-[rgb(98,214,124)]'

export const PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE = '완료'
export const PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_VALUE = 'COMPLETED'
export const PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_COLOR = 'bg-[rgb(72,162,248)]'
export const _PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_HOVER_COLOR =
  'hover:bg-[rgb(72,162,248)] dark:hover:bg-[rgb(72,162,248)]'

export const PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE = '보류'
export const PROJECT_ISSUE_TASK_PROGRESS_INIT_VALUE = 'INIT'
export const PROJECT_ISSUE_TASK_PROGRESS_INIT_COLOR = 'bg-[rgb(221,109,96)]'
export const PROJECT_ISSUE_TASK_PROGRESS_INIT_HOVER_COLOR =
  'hover:bg-[rgb(221,109,96)] dark:hover:bg-[rgb(221,109,96)]'

// modal
export const MODAL_BTN_CREATE = '생성'
export const MODAL_BTN_SAVE = '저장'

export const MODAL_CREATE_PROJECT_ISSUE = 'project-issue'
export const MODAL_INVITE_MEMBER_IN_PROJECT = 'invite-member'
export const MODAL_CRAETE_PROJECT = 'create-project'
