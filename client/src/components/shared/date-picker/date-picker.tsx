import { Sheet } from '@/components/ui/sheet';
import { getDimension } from '@/utils/helpers/ui.helper';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

type TDatePickerContext = {
  date: Date;
  showDay: boolean;
  setShowDay: Dispatch<SetStateAction<boolean>>;
  showMonth: boolean;
  setShowMonth: Dispatch<SetStateAction<boolean>>;
  getDays: () => number[];
  updateDay: (day: number) => void;
  updateMonth: (month: number) => void;
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
  const [date, setDate] = useState(new Date());
  const [showDay, setShowDay] = useState(false);
  const [showMonth, setShowMonth] = useState(false);

  const getDays = () => {
    const totalDays = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const days: number[] = [];
    for (let i = 1; i <= totalDays; i++) days.push(i);

    return days;
  };

  const updateDay = (day: number) => {
    console.log(day);
    const currentDate = date;
    currentDate.setDate(day);
    setDate(currentDate);
    setShowDay(false);
  };

  const updateMonth = (month: number) => {
    const currentDate = date;
    currentDate.setMonth(month);
    setDate(currentDate);
    setShowMonth(false);
  };

  return (
    <DatePickerContext.Provider
      value={{
        date,
        getDays,
        showDay,
        setShowDay,
        updateDay,
        showMonth,
        setShowMonth,
        updateMonth,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
}

export function DatePicker() {
  const { date, setShowDay, setShowMonth } = useContext(DatePickerContext)!;
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

      <Text className="text-white text-base font-semibold flex-1 bg-card-bg-dark py-2 rounded-lg text-center">
        {date.getFullYear()}
      </Text>
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
