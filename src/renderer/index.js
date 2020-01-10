import PropTypes from 'prop-types';

import Cards, { shape as cardShape } from './Cards';
import ProgressBars, { shape as progressBarShape } from './ProgressBars';
import ProgressCircles, { shape as progressCircleShape } from './ProgressCircles';
import Tables, { shape as tableShape } from './Tables';
import Texts, { shape as textShape } from './Texts';
import Timelines, { shape as timelineShape } from './Timelines';

export const TYPES = {
  BAR: 'BAR',
  CIRCLE: 'CIRCLE',
  TABLE: 'TABLE',
  TEXT: 'TEXT',
  TIMELINE: 'TIMELINE',
  CARDS: 'CARDS',
};

export const renderers = {
  [TYPES.BAR]: ProgressBars,
  [TYPES.CARDS]: Cards,
  [TYPES.CIRCLE]: ProgressCircles,
  [TYPES.TABLE]: Tables,
  [TYPES.TEXT]: Texts,
  [TYPES.TIMELINE]: Timelines,
};

export const RendererPropTypes = PropTypes.oneOfType([tableShape, progressBarShape, progressCircleShape, textShape, cardShape, timelineShape]).isRequired;
