import axios from 'axios'
import {
  ICreateStudentonStudy,
  IGetAllStudentsOnStudy,
  IStudentOnStudy,
} from '../types'
// import $api from '../../../http'

axios.defaults.baseURL = 'http://64.226.89.72'
const API_URL: string = '/api/students-on-study/'

// Get all students on study
const getStudentsOnStudy = async ({
  token,
  departmentFilter,
}: IGetAllStudentsOnStudy): Promise<IStudentOnStudy[]> => {
  const response = await axios.get(API_URL + departmentFilter, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

// Create student
const createStudentOnStudy = async ({
  token,
  first_name,
  last_name,
  surname,
  phone,
  came_from,
  department,
  on_request,
  is_archive,
  laptop,
  payment_status,
  notes,
}: ICreateStudentonStudy): Promise<IStudentOnStudy[]> => {
  const response = await axios.post(
    API_URL,
    {
      first_name,
      last_name,
      surname,
      phone,
      came_from,
      department,
      on_request,
      is_archive,
      laptop,
      payment_status,
      notes,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

const studentsOnStudyService = {
  getStudentsOnStudy,
  createStudentOnStudy,
}

export default studentsOnStudyService