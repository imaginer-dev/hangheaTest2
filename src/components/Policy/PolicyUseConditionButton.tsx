import { useJoinState } from '@/stores/joinStore';

const PolicyUseConditionButton = () => {
  const { useTermsCheckHandler } = useJoinState();

  return (
    <div className="absolute bottom-12 w-10/12 md:w-11/12">
      <button
        type={'button'}
        onClick={useTermsCheckHandler}
        className="btn btn-outline btn-primary m-auto block w-full max-w-md"
      >
        동의하기
      </button>
    </div>
  );
};

export default PolicyUseConditionButton;
