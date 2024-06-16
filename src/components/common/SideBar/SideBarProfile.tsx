import ProfileIcon from '@/assets/svgs/ProfileIcon';
import SettingIcon from '@/assets/svgs/SettingIcon';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  userName: string;
  imageUrl: string | null;
}

const SideBarProfile: FC<Props> = ({ userName, imageUrl }) => {
  /**
   * TODO: 프로필 이미지 값이 있는지 없는지에 따라 아이콘 또는 이미지 보여주기
   */

  return (
    <div className="flex w-full flex-row justify-between border-b-2 border-white pb-4">
      <Link to={`/profile`} className="flex flex-row items-center gap-1 text-lg">
        <ProfileIcon width="49px" height="49px" imageUrl={imageUrl} />
        <span className="ml-2">{userName}</span>
      </Link>
      <div className="flex flex-row items-center gap-2">
        <Link to="/" className="cursor-pointer rounded-lg bg-base-100 px-3 py-1 font-black hover:opacity-50">
          내 캘린더 보기
        </Link>
        <Link to="/setting" className="cursor-pointer hover:opacity-50">
          <SettingIcon />
        </Link>
      </div>
    </div>
  );
};

export default SideBarProfile;
