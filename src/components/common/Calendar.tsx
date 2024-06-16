import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DB_Events, Events } from '@/utils';
import { formatDateRange } from '@/utils/dateUtils.ts';
import CreateEventDialog from '@/components/MyCalendar/CreateEventButton.tsx';
import Dialog from './Dialog.tsx';
import { getDateListFromStartDateToEndDate } from '@/utils/getDateListFromStartdateToEnddate.ts';

interface DialogElement {
  openModal: () => void;
  closeModal: () => void;
}

interface EventInfo {
  timeText: string;
  event: {
    title: string;
  };
  backgroundColor: string;
}

interface EventCardsProps {
  events: DB_Events[];
  date: string | null;
  onDelete: (id: number) => void;
}

interface CalendarProps {
  db_events: DB_Events[];
  onDeleteClicked: (id: number) => void;
  isGroupCalendar?: boolean;
  startDate?: string;
  endDate?: string;
}

export default memo(function Calendar({
  db_events,
  onDeleteClicked,
  isGroupCalendar,
  startDate,
  endDate,
}: CalendarProps) {
  const [calendarHeight, setCalendarHeight] = useState<string | number>('auto');
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<DB_Events[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  const events: Events[] = useMemo(
    () =>
      db_events.map((event) => ({
        ...event,
        start: event.start_date,
        end: event.end_date,
      })),
    [db_events],
  );

  useEffect(() => {
    if (isGroupCalendar && db_events.length > 0) {
      const dateList = getDateListFromStartDateToEndDate(startDate!, endDate!);
      console.log(startDate);
      console.log(endDate);

      const eventDateList = db_events.map((event) => event.start_date.split('T')[0]);

      console.log(dateList);

      const allDateTableList = eventDateList.map((date) => {
        return document.querySelector(`[data-date="${date}"]`);
      });

      allDateTableList.forEach((date) => {
        const existingClassName = date?.className;
        const newClassName = existingClassName + ' bg-base-200';
        date?.setAttribute('class', newClassName);
      });

      const formatedList = dateList.filter((date) => !eventDateList.includes(date));

      const dateTableDataList = formatedList.map((date) => {
        return document.querySelector(`[data-date="${date}"]`);
      });

      dateTableDataList.forEach((dateTableData) => {
        const existingClassName = dateTableData?.className;
        const newClassName = existingClassName + ' bg-success';
        dateTableData?.setAttribute('class', newClassName);
      });
    }
  }, [isGroupCalendar, startDate, endDate, db_events, isChanged]);

  const handleDateSelection = (dateClickInfo: { dateStr: string }) => {
    const clickedDateStr = dateClickInfo.dateStr;
    setSelectedDate(clickedDateStr);
    const clickedDateEvents = db_events.filter(
      (event) => clickedDateStr >= event.start_date.split('T')[0] && clickedDateStr <= event.end_date.split('T')[0],
    );
    setSelectedEvents(clickedDateEvents);
  };

  const handlePrev = () => {
    const calendarApi = calendarRef?.current?.getApi();
    if (calendarApi) {
      calendarApi.prev();
      setSelectedDate(null);
      setIsChanged((prev) => !prev);
    } else {
      console.error('Calendar API is not available.');
    }
  };

  const handleNext = () => {
    const calendarApi = calendarRef?.current?.getApi();
    if (calendarApi) {
      calendarApi.next();
      setSelectedDate(null);
      setIsChanged((prev) => !prev);
    } else {
      console.error('Calendar API is not available.');
    }
  };

  const updateSize = useCallback(() => {
    setCalendarHeight(window.innerWidth < 768 ? 500 : 'auto');
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize(); // 컴포넌트 마운트 시 화면 크기에 따른 업데이트

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [updateSize]);

  return (
    <div>
      <div className="rounded bg-white p-7 px-4">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          // eventClick={handleDateClick}
          dateClick={handleDateSelection}
          dayMaxEvents={5} //Max개수까지보이고 나머지는 more
          //navLinks={true} // 날짜/주 이름을 클릭하여 뷰를 변경할 수 있습니다.
          editable={true} // 이벤트를 수정할 수 있습니다.
          eventContent={isGroupCalendar ? groupEventContent : renderEventContent}
          contentHeight={calendarHeight}
          titleFormat={{
            year: 'numeric',
            month: '2-digit',
          }}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
          }}
          dayHeaderFormat={{
            weekday: 'short',
          }}
          headerToolbar={{
            left: 'prevButton',
            center: 'title',
            right: 'nextButton',
          }}
          customButtons={{
            prevButton: { click: handlePrev },
            nextButton: { click: handleNext },
          }}
        />
      </div>
      {isGroupCalendar ? null : (
        <div className="eventCardList mt-10">
          {selectedDate && <EventCards events={selectedEvents} date={selectedDate} onDelete={onDeleteClicked} />}
        </div>
      )}
    </div>
  );
});

function renderEventContent(eventInfo: EventInfo) {
  return (
    <>
      <div className="line-clamp-1 w-full text-wrap border-0 bg-secondary p-0.5 text-white">
        <b className="border-0">{eventInfo.timeText}</b>
        <i> {eventInfo.event.title}</i>
      </div>
    </>
  );
}

function groupEventContent(eventInfo: EventInfo) {
  eventInfo.backgroundColor;
  return (
    <div className={'w-full overflow-x-hidden'}>
      <div className={`badge text-xs ${eventInfo.backgroundColor}`}>{eventInfo.event.title}</div>
    </div>
  );
}

function EventCards({ events, date, onDelete }: EventCardsProps) {
  const [menuOpen, setMenuOpen] = useState(-1);

  const dialogRef = useRef<DialogElement | null>(null);
  const openModal = (dialogRef: React.RefObject<DialogElement>) => {
    if (dialogRef.current) {
      dialogRef.current?.openModal();
    }
  };

  if (!events.length) {
    return (
      <div className="min-h-[150px] min-w-[240px] bg-white p-4 text-black">
        일정이 없습니다. <br />
        일정을 등록해주세요!
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-2 ml-2">{date}</h2>
      <div className="flex gap-5 overflow-x-auto">
        {events.map((event, index) => {
          const eventDateRange = formatDateRange(event.start_date, event.end_date);
          // const eventTime = formatTime(event.start_date);
          return (
            <div key={index} className="relative min-h-[150px] min-w-[240px] bg-white p-4 text-black">
              <h3>{event.title}</h3>
              <p className="mt-1 text-xs">{eventDateRange}</p>
              {/* <p className="mt-1 text-xs">{eventTime}</p> */}
              {/* 메뉴 버튼 */}
              <div
                className="absolute right-2 top-2 flex cursor-pointer flex-col items-center justify-center"
                onClick={() => setMenuOpen(menuOpen === index ? -1 : index)}
              >
                <div className="mb-1 h-1 w-1 rounded-full bg-[#429400]"></div>
                <div className="mb-1 h-1 w-1 rounded-full bg-[#429400]"></div>
                <div className="h-1 w-1 rounded-full bg-[#429400]"></div>
              </div>
              {/* 메뉴 */}
              {menuOpen === index && (
                <div className="absolute right-0 top-10 z-10 rounded-lg bg-white shadow-md">
                  <ul>
                    <li className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => openModal(dialogRef)}>
                      수정
                    </li>
                    <Dialog
                      ref={dialogRef}
                      title="일정 수정"
                      desc={''}
                      children={
                        <CreateEventDialog
                          id={event.id}
                          title={event.title}
                          start_date={event.start_date}
                          end_date={event.end_date}
                        />
                      }
                    />
                    <li className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => onDelete(event.id)}>
                      삭제
                    </li>
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
