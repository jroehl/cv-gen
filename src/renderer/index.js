import cardRenderer from './card';
import progressBarsRenderer from './progress-bars';
import progressCirclesRenderer from './progress-circles';
import tableRenderer from './table';
import textRenderer from './text';
import timelineRenderer from './timeline';

export const TYPES = {
  BAR: 'BAR',
  CIRCLE: 'CIRCLE',
  TABLE: 'TABLE',
  TEXT: 'TEXT',
  TIMELINE: 'TIMELINE',
  CARDS: 'CARDS',
};

export const renderers = {
  [TYPES.BAR]: progressBarsRenderer,
  [TYPES.CARDS]: cardRenderer,
  [TYPES.CIRCLE]: progressCirclesRenderer,
  [TYPES.TABLE]: tableRenderer,
  [TYPES.TEXT]: textRenderer,
  [TYPES.TIMELINE]: timelineRenderer,
};
