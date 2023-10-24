import ReactPDF from '@react-pdf/renderer';
import { ALIGNMENTS, COLUMN_TYPES } from './constants';

export interface CV {
  config: Config;
  contact: Contact;
  columns: Columns;
}

export interface SchemaCV extends CV {
  $schema?: string;
}

export interface Config {
  leftColumnWidth: number;
  pageNumberText: string;
  romanizedPageNumbers: boolean;
  printFriendly: boolean;
  font: Font;
  colors: Colors;
  slices?: { [key: string]: number };
}

export interface Font {
  family: string;
  src: string;
}

export interface Colors {
  darkest: string;
  dark: string;
  mid: string;
  light: string;
  lightest: string;
}

export interface Contact {
  name: string;
  phone: string;
  mail: string;
  website: string;
  address: string;
  portals: Portal[];
  image: string;
  description: string;
}

export interface Portal {
  icon: string;
  url: string;
}

export type AllColumnItemTypes = TableColumnItem | ProgressBarColumnItem | ProgressCircleColumnItem | TextColumnItem | TimelineColumnItem | CardColumnItem;

export type Alignment = (typeof ALIGNMENTS)[number];

export type Columns = { [key in Alignment]: AllColumnItemTypes[] };

export type ColumnType = (typeof COLUMN_TYPES)[number];

type Values<TType extends ColumnType> = TType extends 'TABLE'
  ? TableValues[]
  : TType extends 'PROGRESS_BAR'
  ? ProgressValues[][]
  : TType extends 'PROGRESS_CIRCLE'
  ? ProgressValues[]
  : TType extends 'TEXT'
  ? TextValues[]
  : TType extends 'TIMELINE'
  ? TimelineValues[]
  : TType extends 'CARD'
  ? CardValues[]
  : never;

export interface ColumnDefault {
  title: string;
  reactPdfProps?: ReactPdfProps;
}

export type TableColumnItem = ColumnItem<'TABLE'>;
export type ProgressBarColumnItem = ColumnItem<'PROGRESS_BAR'>;
export type ProgressCircleColumnItem = ColumnItem<'PROGRESS_CIRCLE'>;
export type TextColumnItem = ColumnItem<'TEXT'>;
export type TimelineColumnItem = ColumnItem<'TIMELINE'>;
export type CardColumnItem = ColumnItem<'CARD'>;

interface DefaultRendererProps {
  index: number;
  alignment: Alignment;
  styles: ReactPDF.Styles;
  config: Config;
}

export type TableRendererProps = ColumnItem<'TABLE'> & DefaultRendererProps;
export type ProgressBarRendererProps = ColumnItem<'PROGRESS_BAR'> & DefaultRendererProps;
export type ProgressCircleRendererProps = ColumnItem<'PROGRESS_CIRCLE'> & DefaultRendererProps;
export type TextRendererProps = ColumnItem<'TEXT'> & DefaultRendererProps;
export type TimelineRendererProps = ColumnItem<'TIMELINE'> & DefaultRendererProps;
export type CardRendererProps = ColumnItem<'CARD'> & DefaultRendererProps;

export interface ColumnItem<TType extends ColumnType> extends ColumnDefault {
  type: TType;
  values: Values<TType>;
}

export interface TextValues {
  value: string | string[];
}

export interface TableValues {
  key: string;
  value: string;
}

export interface ProgressValues {
  skill: string;
  proficiency: Proficiency;
  color?: string;
}

export interface ValuesExtended {
  title: string;
  type?: string;
  duration: string;
}

export interface TimelineValues extends ValuesExtended {
  location: string;
  linkTo?: string;
  website?: string;
}

export interface CardValues extends ValuesExtended {
  skills?: string | string[];
  text: string | string[];
}

export type ReactPdfProps = Omit<ReactPDF.ViewProps, 'style'>;

type Proficiency = IntRange<1, 101>;

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
