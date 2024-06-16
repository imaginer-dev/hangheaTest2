export const dateToYYMMDD = (value: string) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startStr = startDate.toISOString().split('T')[0];
  const endStr = endDate.toISOString().split('T')[0];

  return startStr === endStr ? startStr : `${startStr}~${endStr}`;
}

export function formatTime(date: string): string {
  const newDate = new Date(date);
  const hoursUTC = newDate.getUTCHours();
  const minutesUTC = newDate.getUTCMinutes();

  // 한국 시간대로 변환 (UTC+9)
  const hoursKST = (hoursUTC + 9) % 24;
  const isAM = hoursKST < 12;
  const formattedHours = isAM ? hoursKST : hoursKST - 12;
  const formattedMinutes = minutesUTC < 10 ? `0${minutesUTC}` : minutesUTC;

  return isAM ? `오전${formattedHours}:${formattedMinutes}` : `오후${formattedHours}:${formattedMinutes}`;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
