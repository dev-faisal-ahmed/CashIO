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
  onDateChange: (date: Date) => void;
  showDay: boolean;
  setShowDay: Dispatch<SetStateAction<boolean>>;
  getDays: () => number[];
  updateDay: (day: number) => void;
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

  const onDateChange = (date: Date) => {
    setDate(date);
  };

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
    onDateChange(currentDate);
    setShowDay(false);
  };

  return (
    <DatePickerContext.Provider
      value={{ date, onDateChange, getDays, showDay, setShowDay, updateDay }}
    >
      {children}
    </DatePickerContext.Provider>
  );
}

export function DatePicker() {
  const { date, setShowDay } = useContext(DatePickerContext)!;
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
      <Text className="text-white  text-base font-semibold flex-1 bg-card-bg-dark py-2 rounded-lg text-center">
        {months[date.getMonth()]}
      </Text>
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
              className="text-white text-center text-base border border-white rounded-lg"
            >
              {eachDay}
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </Sheet>
  );
}
