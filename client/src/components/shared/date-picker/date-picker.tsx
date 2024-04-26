import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
} from 'react';
import { Sheet } from '@/components/ui/sheet';
import { getDimension } from '@/utils/helpers/ui.helper';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDatePicker } from './use-date-picker';

type TDatePickerContext = {
  date: Date;
  showDay: boolean;
  showMonth: boolean;
  showYear: boolean;
  setShowDay: Dispatch<SetStateAction<boolean>>;
  setShowMonth: Dispatch<SetStateAction<boolean>>;
  setShowYear: Dispatch<SetStateAction<boolean>>;
  getDays: () => number[];
  getYears: () => number[];
  updateDay: (day: number) => void;
  updateMonth: (month: number) => void;
  updateYear: (year: number) => void;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'Jun',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const { width } = getDimension();
const DatePickerContext = createContext<TDatePickerContext | null>(null);

export function DatePickerProvider({ children }: PropsWithChildren) {
  const { states, handlers } = useDatePicker();

  return (
    <DatePickerContext.Provider value={{ ...states, ...handlers }}>
      {children}
    </DatePickerContext.Provider>
  );
}

export function DatePicker() {
  const { date, setShowDay, setShowMonth, setShowYear } =
    useContext(DatePickerContext)!;
  return (
    <View
      style={{ gap: 16 }}
      className="border-y border-white my-6 py-4 flex-row"
    >
      <TouchableWithoutFeedback onPress={() => setShowDay(true)}>
        <Text className="text-white text-base font-semibold flex-1 bg-card-bg-dark py-2 rounded-lg text-center">
          {date.getDate()}
        </Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => setShowMonth(true)}>
        <Text className="text-white  text-base font-semibold flex-1 bg-card-bg-dark py-2 rounded-lg text-center">
          {months[date.getMonth()]}
        </Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => setShowYear(true)}>
        <Text className="text-white text-base font-semibold flex-1 bg-card-bg-dark py-2 rounded-lg text-center">
          {date.getFullYear()}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const eachDayItemWidth = (width - 130) / 5;

export function DayPicker() {
  const { showDay, setShowDay, getDays, updateDay } =
    useContext(DatePickerContext)!;
  return (
    <Sheet isOpen={showDay} close={() => setShowDay(false)}>
      <View style={{ gap: 20 }} className="flex-row flex-wrap pb-4">
        {getDays().map((eachDay) => (
          <TouchableWithoutFeedback
            key={eachDay}
            onPress={() => updateDay(eachDay)}
          >
            <Text
              style={{ width: eachDayItemWidth }}
              className="text-white text-center text-base border border-white rounded-lg py-1"
            >
              {eachDay}
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </Sheet>
  );
}

const eachMonthItemWidth = (width - 90) / 3;

export function MonthPicker() {
  const { showMonth, setShowMonth, updateMonth } =
    useContext(DatePickerContext)!;
  return (
    <Sheet isOpen={showMonth} close={() => setShowMonth(false)}>
      <View style={{ gap: 20 }} className="flex-row flex-wrap pb-4">
        {months.map((month, index) => (
          <TouchableWithoutFeedback
            key={month}
            onPress={() => updateMonth(index)}
          >
            <Text
              style={{ width: eachMonthItemWidth }}
              className="text-white text-center text-base border border-white rounded-lg py-1"
            >
              {month}
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </Sheet>
  );
}

const eachYearItemWidth = (width - 110) / 4;

export function YearPicker() {
  const { showYear, setShowYear, getYears, updateYear } =
    useContext(DatePickerContext)!;
  return (
    <Sheet isOpen={showYear} close={() => setShowYear(false)}>
      <View style={{ gap: 20 }} className="flex-row flex-wrap pb-4">
        {getYears().map((year) => (
          <TouchableWithoutFeedback key={year} onPress={() => updateYear(year)}>
            <Text
              style={{ width: eachYearItemWidth }}
              className="text-white text-center text-base border border-white rounded-lg py-1"
            >
              {year}
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </Sheet>
  );
}
