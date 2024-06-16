import { FC, ReactNode } from 'react';
import HistoryBackButton from './HistoryBackButton';

interface AppBarProps {
  title?: string | null;
  backButton?: boolean;
  IconButton?: ReactNode | null;
  calendarName?: string | null;
}

const AppBar: FC<AppBarProps> = ({ title = null, backButton = true, IconButton = null, calendarName = null }) => {
  return (
    <nav className="grid grid-cols-5 px-5 py-5 lg:justify-items-center">
      <div className="col-span-1">{backButton ? <HistoryBackButton /> : IconButton ?? <span />}</div>
      {title === null ? (
        <div className="col-span-2"></div>
      ) : (
        <h1 className="col-span-3 my-auto text-center ">{title}</h1>
      )}
      {calendarName === null ? (
        <span />
      ) : (
        <div
          style={{
            backgroundColor: 'rgba(226, 230, 218, 0.5)',
          }}
          className="col-span-2 h-full rounded-lg py-1.5 text-center text-sm font-bold lg:col-span-5 lg:w-full"
        >
          {calendarName}
        </div>
      )}
    </nav>
  );
};

export default AppBar;
