import type { Indicator } from '../types/general'

export const classColors = {
  todo: 'bg-indicator-todo',
  next: 'bg-indicator-next',
  done: 'bg-indicator-done',
  anomaly: 'bg-indicator-anomaly',
}

export const indicators: Indicator[] = [
  {
    label: 'All',
  },
  {
    label: 'To Do',
    colorLabel: 'todo',
  },
  {
    label: 'Next',
    colorLabel: 'next',
  },
  {
    label: 'Done',
    colorLabel: 'done',
  },
  {
    label: 'Anomaly',
    colorLabel: 'anomaly',
  },
]
