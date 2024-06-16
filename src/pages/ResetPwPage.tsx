import CenterPageLayout from '../layouts/CenterPageLayout.tsx';
import LoginFormActions from '../components/login/LoginFormActions.tsx';
import EditPwButton from '../components/EditPw/EditPwButton.tsx';
import InputForm from '../components/common/InputForm.tsx';
import { useEditPwState } from '../stores/editPwStore.ts';
import Footer from '@/components/common/Footer.tsx';

const ResetPwPage = () => {
  const { email, emailHandler } = useEditPwState();

  return (
    <>
      <CenterPageLayout>
        <form className={'flex w-full flex-col'}>
          <div className="card mb-10 w-96 bg-base-200 text-primary-content">
            <div className="card-body">
              <p>
                새로운 비밀번호 등록이 가능한 링크를 <br />
                이메일로 보내드립니다.
              </p>
              <p>회원가입 시 등록한 이메일 주소를 입력해주세요.</p>
            </div>
          </div>

          <InputForm
            defaultValue={email}
            title={'이메일'}
            placeholder={'이메일을 입력하세요'}
            hint={''}
            onChange={(e) => emailHandler(e.target.value)}
            type={'email'}
            name={'email'}
          />
        </form>
        <LoginFormActions>
          <EditPwButton />
        </LoginFormActions>
      </CenterPageLayout>
      <Footer />
    </>
  );
};

export default ResetPwPage;
