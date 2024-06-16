import JoinPageLayout from '../layouts/JoinPageLayout.tsx';
import VerticalLogo from '../assets/svgs/VerticalLogo.tsx';
import {
  JoinForm,
  NameInput,
  NickNameInput,
  PhoneInput,
  EmailInput,
  PasswordInput,
  PwCheckInput,
  TermsCheckInput,
  JoinFormActions,
  JoinButton,
} from '../components/Join';
import Footer from '@/components/common/Footer.tsx';

const JoinPage = () => {
  return (
    <>
      <JoinPageLayout>
        <VerticalLogo />
        <JoinForm>
          <NameInput />
          <NickNameInput />
          <PhoneInput />
          <EmailInput />
          <PasswordInput />
          <PwCheckInput />
          <TermsCheckInput />
        </JoinForm>
        <JoinFormActions>
          <JoinButton />
        </JoinFormActions>
      </JoinPageLayout>
      <Footer />
    </>
  );
};

export default JoinPage;
