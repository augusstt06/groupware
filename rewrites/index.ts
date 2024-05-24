import attendancePath from './childs/attendance'
import authPath from './childs/auth'
import boardPath from './childs/board'
import colleagePath from './childs/colleague'
import orgPath from './childs/organization'
import postPath from './childs/post'
import projectPath from './childs/project'
import signPath from './childs/sign'
import teamPath from './childs/team'
import userPath from './childs/user'

const rewritePaths = [
  ...authPath,
  ...attendancePath,
  ...boardPath,
  ...colleagePath,
  ...orgPath,
  ...postPath,
  ...projectPath,
  ...signPath,
  ...teamPath,
  ...userPath,
]

export default rewritePaths
