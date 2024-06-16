import { FC } from 'react';
import PolicyUseCondition from '../../components/Policy/PolicyUseCondition';
import UseTermsShowLayout from '@/layouts/UseTermsShowLayout';

const UseConditionShowPage: FC = () => {
  return (
    <UseTermsShowLayout title="전자상거래 표준약관">
      <PolicyUseCondition />
    </UseTermsShowLayout>
  );
};

export default UseConditionShowPage;
