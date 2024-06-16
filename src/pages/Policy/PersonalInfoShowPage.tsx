import { FC } from 'react';
import PolicyShowLayout from '@/layouts/PolicyShowLayout';
import PolicyPersonalInfo from '../../components/Policy/PolicyPersonalInfo';

const PersonalInfoShowPage: FC = () => {
  return (
    <PolicyShowLayout title="개인정보 처리방침">
      <PolicyPersonalInfo />
    </PolicyShowLayout>
  );
};

export default PersonalInfoShowPage;
