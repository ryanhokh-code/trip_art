export enum Tab {
  MAP = 'MAP',
  SCHEDULE = 'SCHEDULE',
  FLIGHT = 'FLIGHT',
  FOOD = 'FOOD',
  PACK = 'PACK',
  CALC = 'CALC',
  WEATHER = 'WEATHER',
  EXPENSE = 'EXPENSE',
  PHOTO = 'PHOTO',
  AI = 'AI'
}

export interface Expense {
  id: string;
  desc: string;
  amount: number;
  category: string;
}

export interface PackingItem {
  id: string;
  text: string;
  category: 'baby' | 'parents' | 'tech' | 'med' | 'doc';
  checked: boolean;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  isHighlight?: boolean;
  mapLink?: string;
}

export interface DailySchedule {
  date: string;
  day: string;
  events: ScheduleEvent[];
}

export interface PhotoSpot {
  id: string;
  title: string;
  desc: string;
  checked: boolean;
}

export interface PinData {
  id: string;
  label: string;
  desc: string;
  top: string;
  left: string;
}

export interface WeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
}