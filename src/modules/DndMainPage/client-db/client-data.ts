import { IData } from '../types/index';

const  today = new Date()
 
const now = today.toLocaleTimeString('ru-RU')
const sliceNow = now.slice(0, 2)

const initialData: IData = {
  students: [],
  columns: {
    "column-1": {
      id: "column-1",
      title: "Ждёт звонка",
      studentIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "Звонок совершён",
      studentIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Записан на пробный урок",
      studentIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Посетил пробный урок",
      studentIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
}


export {initialData} 