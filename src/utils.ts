import { AllColumnItemTypes, ColumnItem } from './types';

export function isTableColumn(column: AllColumnItemTypes): column is ColumnItem<'TABLE'> {
  return column.type === 'TABLE';
}

export function isProgressBarColumn(column: AllColumnItemTypes): column is ColumnItem<'PROGRESS_BAR'> {
  return column.type === 'PROGRESS_BAR';
}

export function isProgressCircleColumn(column: AllColumnItemTypes): column is ColumnItem<'PROGRESS_CIRCLE'> {
  return column.type === 'PROGRESS_CIRCLE';
}

export function isTextColumn(column: AllColumnItemTypes): column is ColumnItem<'TEXT'> {
  return column.type === 'TEXT';
}

export function isTimelineColumn(column: AllColumnItemTypes): column is ColumnItem<'TIMELINE'> {
  return column.type === 'TIMELINE';
}

export function isCardColumn(column: AllColumnItemTypes): column is ColumnItem<'CARD'> {
  return column.type === 'CARD';
}
