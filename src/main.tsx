import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChangePasswordPage from './pages/ChangePasswordPage.tsx';
import { JoinPage, LoginPage, NotFound, Policy, ResetPwPage } from './pages/index.ts';
import ProtectedRoute from './providers/ProtectedRoute.tsx';
import EditGroupSchedule from './pages/EditGroupPage.tsx';
import AddGroupSchedulePage from './pages/AddGroupPage.tsx';
import GroupCalendarPage from './pages/GroupCalendarPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import SettingPage from './pages/SettingPage.tsx';
import App from '@/App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: '/group/:groupId/edit',
        element: <EditGroupSchedule />,
      },
      {
        path: '/group/:groupId',
        element: <GroupCalendarPage />,
      },
      {
        path: '/add-group',
        element: <AddGroupSchedulePage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/join',
    element: <JoinPage />,
  },
  {
    path: '/editPw',
    element: <ResetPwPage />,
  },
  {
    path: '/change-password',
    element: <ChangePasswordPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/setting',
    element: <SettingPage />,
  },
  {
    path: '/policy',
    children: [
      {
        path: 'personalInfo',
        element: <Policy.PersonalInfoShowPage />,
      },
      {
        path: 'usecondition',
        element: <Policy.UseConditionShowPage />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
