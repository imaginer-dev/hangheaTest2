import { useJoinState } from '@/stores/joinStore';
import { useEffect, useRef, useState } from 'react';
import Dialog from '../common/Dialog';
import PersonalInfoPage from '@/pages/Policy/PersonalInfoPage';
import UseConditionPage from '@/pages/Policy/UseConditionPage';

const TermsCheckInput = () => {
  interface DialogElement {
    openModal: () => void;
    closeModal: () => void;
  }

  const [dialogMessage, setDialogMessage] = useState('');
  const { useTermsCheck, privacyTermsCheck } = useJoinState();
  const dialogRef = useRef<DialogElement | null>(null);

  const useTermsClick = () => {
    setDialogMessage('이용약관 동의');
    dialogRef.current?.openModal();
  };

  const privacyTermsClick = () => {
    setDialogMessage('개인정보 수집, 이용 동의');
    dialogRef.current?.openModal();
  };

  useEffect(() => {
    dialogRef.current?.closeModal();
  }, [useTermsCheck, privacyTermsCheck]);

  return (
    <>
      <label className="form-control mb-9 mt-5 w-full">
        <div className="flex flex-col">
          <label className="font-bold">약관 동의</label>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <label className="hover:underline" htmlFor="termsOne" onClick={useTermsClick}>
            이용약관 동의 (필수)
          </label>
          <input
            type="radio"
            className="radio-primary radio"
            checked={useTermsCheck}
            onClick={useTermsClick}
            aria-label={'join-useTermsCheck-input'}
            readOnly
          />
        </div>
        {!useTermsCheck ? (
          <span className="text-red-500">이용약관에 동의해 주세요.</span>
        ) : (
          <span className="h-6"></span>
        )}
        <div className="mt-2 flex items-center justify-between">
          <label className="hover:underline" htmlFor="termsTwo" onClick={privacyTermsClick}>
            개인정보 수집, 이용 동의 (필수)
          </label>
          <input
            type="radio"
            className="radio-primary radio"
            checked={privacyTermsCheck}
            onClick={privacyTermsClick}
            aria-label={'join-privacyTermsCheck-input'}
            readOnly
          />
        </div>
        {!privacyTermsCheck ? (
          <span className="text-red-500">개인정보 수집, 이용에 동의해 주세요.</span>
        ) : (
          <span className="h-6"></span>
        )}
      </label>
      <Dialog ref={dialogRef} desc={dialogMessage}>
        {dialogMessage === '이용약관 동의' ? <UseConditionPage /> : <PersonalInfoPage />}
      </Dialog>
    </>
  );
};

export default TermsCheckInput;
