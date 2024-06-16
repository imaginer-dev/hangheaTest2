import AppBar from '@/components/common/AppBar';
import HamburgerButton from '@/components/common/SideBar/HamburgerButton';
import { useGetProfile } from '@/react-queries/userGetProfile';
import { Link } from 'react-router-dom';

const SettingPage = () => {
  const { data: user, error, isLoading, isError } = useGetProfile();
  console.log(user);

  if (isError) {
    // TODO: 추후 에러 처리
    console.error(error);
  }

  return (
    <div className="lg:ml-80">
      <AppBar backButton={false} IconButton={<HamburgerButton />} />
      <main className="z-1 relative flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="relative flex h-full w-full">
              {isLoading && <span className="loading" />}
              <div className=" absolute top-[70px] inline-flex h-40 flex-col items-start justify-start gap-2.5 border-b border-yellow-500 px-8 py-5">
                <div className=" w-44 font-['Inter'] text-base font-semibold leading-normal text-black">정보</div>
                <div className=" flex flex-col items-start justify-start gap-2.5">
                  <div className=" inline-flex w-80 items-start justify-between">
                    <div className="text-center font-['Inter'] text-base font-normal leading-normal text-black">
                      버전 정보
                    </div>
                    <div className=" text-center font-['Inter'] text-base font-normal leading-normal text-black">
                      0.0.1v
                    </div>
                  </div>
                  <Link to={'/policy/usecondition'}>
                    <div className=" inline-flex w-80 items-center justify-between">
                      <div className=" text-center font-['Inter'] text-base font-normal leading-normal text-black hover:underline">
                        이용약관 보기
                      </div>
                      <div className=" relative h-5 w-5" />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="13" height="15">
                        <path
                          d="M 2 2 L 18 10 L 2 18"
                          fill="none"
                          stroke="green"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                  <Link to={'/policy/personalInfo'}>
                    <div className=" inline-flex w-80 items-center justify-between">
                      <div className=" text-center font-['Inter'] text-base font-normal leading-normal text-black hover:underline">
                        개인정보 처리방침 보기
                      </div>
                      <div className=" relative h-5 w-5" />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="13" height="15">
                        <path
                          d="M 2 2 L 18 10 L 2 18"
                          fill="none"
                          stroke="green"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
                <div className=" absolute top-[200px] font-['Inter'] text-base font-normal leading-normal text-black">
                  회원 탈퇴
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingPage;
