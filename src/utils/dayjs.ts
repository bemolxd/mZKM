import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.locale('pl');
dayjs.extend(relativeTime);
dayjs.extend(LocalizedFormat);
dayjs.extend(duration);

export { dayjs };
