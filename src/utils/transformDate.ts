const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);


  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${month} ${day}, ${year}, ${hours}:${formattedMinutes} ${period}`;
};

export const getDate = (pubDate: string): string => {
  const date = new Date(pubDate);
  const day = date.getUTCDate()
      .toString()
      .padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString()
      .padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}.${month}.${year}`;
}