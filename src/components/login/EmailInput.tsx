import InputForm from '../common/InputForm.tsx';
import { useLoginState } from '../../stores/loginStore.ts';
import { LooseValidation, ValidateProcessor } from '@/utils/authUtils.ts';

const EmailInput = () => {
  const { email, emailHandler, showError } = useLoginState();
  const validator = new ValidateProcessor(new LooseValidation());

  return (
    <InputForm
      defaultValue={email}
      title={'Email'}
      placeholder={'이메일을 입력하세요'}
      hint={''}
      onChange={(e) => emailHandler(e.target.value)}
      type={'email'}
      name={'email'}
      id={'email-input'}
      aria-label={'login-email-input'}
      error={showError && !validator.isValidEmail(email)}
      errorText={'올바른 이메일을 입력해 주세요.'}
    />
  );
};

export default EmailInput;
