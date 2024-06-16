import { useLoginState } from '@/stores/loginStore.ts';
import { LooseValidation, ValidateProcessor } from '@/utils/authUtils.ts';
import { useRef, useState } from 'react';
import useSignIn from '../../react-queries/useSignIn.ts';
import { isAuthError } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@/pages';
import Dialog from '../common/Dialog.tsx';

interface DialogElement {
  openModal: () => void;
  closeModal: () => void;
}

const messages = {
  ISVAILD_ERROR: '이메일 또는 비밀번호 형식이 잘못되었습니다.',
  AUTH_ERROR: '인증 오류가 발생했습니다. 다시 시도해주세요.',
};

const LoginButton = () => {
  const { email, password, setShowError } = useLoginState();
  const { mutate, isPending } = useSignIn();
  const navigate = useNavigate();
  const dialogRef = useRef<DialogElement | null>(null);
  const [dialogMessage, setDialogMessage] = useState('');

  const validator = new ValidateProcessor(new LooseValidation());

  const onClick = () => {
    if (!validator.isValidEmail(email) || !validator.isValidPassword(password)) {
      setDialogMessage(messages.ISVAILD_ERROR);
      setShowError(true);
      dialogRef.current?.openModal();
      return;
    }

    mutate(
      {
        email,
        password,
      },
      {
        onError: (error) => {
          if (isAuthError(error)) {
            setDialogMessage(messages.AUTH_ERROR);
            dialogRef.current?.openModal();
          }
        },
        onSuccess: () => {
          navigate('/');
        },
      },
    );
  };

  return (
    <>
      <button type={'button'} onClick={onClick} className="btn btn-outline btn-primary w-full">
        로그인
      </button>
      <Dialog ref={dialogRef} desc={dialogMessage}></Dialog>
      {isPending && <Loading size={'lg'} color={'primary'} display={'spinner'} />}
    </>
  );
};

export default LoginButton;
