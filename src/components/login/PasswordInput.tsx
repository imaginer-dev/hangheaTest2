import InputForm from '../common/InputForm.tsx';
import { useLoginState } from '../../stores/loginStore.ts';
import { LooseValidation, ValidateProcessor } from '@/utils/authUtils.ts';

const PasswordInput = () => {
  const { password, passwordHandler, showError } = useLoginState();

  const validator = new ValidateProcessor(new LooseValidation());

  return (
    <InputForm
      defaultValue={password}
      title={'Password'}
      placeholder={'패스워드를 입력해 주세요.'}
      hint={''}
      onChange={(e) => passwordHandler(e.target.value)}
      name={'password'}
      type={'password'}
      id={'password-input'}
      aria-label={'login-password-input'}
      error={showError && !validator.isValidPassword(password)}
      errorText={'비밀번호는 6자리 이상이어야 합니다.'}
    />
  );
};

export default PasswordInput;
