import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout/components/Layout'
import MainPage from '../pages/main/components/MainPage/MainPage'
import StudentsPage from '../pages/students/StudentsPage'
import AuthPage from '../pages/auth/AuthPage'
import Page404 from '../pages/page404/Page404'
import AnalyticsPage from '../pages/analitics/AnalyticsPage'
import ProfilePage from '../pages/profile/ProfilePage'
import PaymentPage from '../pages/payment/components/PaymentPage'
import StudentDetails from '../pages/studentDetails/StudentDetails'
import ArchivePage from '../pages/archive/ArchivePage'
import CoursePage from '../pages/course/CoursePage'
import EmployeesPage from '../pages/Employees/EmployeesPage'
import GroupDetails from '../pages/groupDetails/GroupDetails'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
    children: [
      { path: 'forgot-password', element: <AuthPage /> },
      { path: 'verification', element: <AuthPage /> },
      { path: 'reset-password', element: <AuthPage /> },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'home-page', element: <MainPage /> },
      { path: 'students', element: <StudentsPage /> },
      { path: `students/:id`, element: <StudentDetails /> },
      { path: `students/groups/:id`, element: <GroupDetails /> },
      { path: 'employees', element: <EmployeesPage /> },
      { path: 'courses', element: <CoursePage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'payment', element: <PaymentPage /> },
      { path: 'archive', element: <ArchivePage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
])
