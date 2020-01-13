import PropTypes from 'prop-types';

import Cards, { shape as cardShape } from './Cards';
import ProgressBars, { shape as progressBarShape } from './ProgressBars';
import ProgressCircles, { shape as progressCircleShape } from './ProgressCircles';
import Tables, { shape as tableShape } from './Tables';
import Texts, { shape as textShape } from './Texts';
import Timelines, { shape as timelineShape } from './Timelines';

export const TYPES = {
  CARD: 'CARD',
  PROGRESS_BAR: 'PROGRESS_BAR',
  PROGRESS_CIRCLE: 'PROGRESS_CIRCLE',
  TABLE: 'TABLE',
  TEXT: 'TEXT',
  TIMELINE: 'TIMELINE',
};

export const Renderers = {
  [TYPES.CARD]: Cards,
  [TYPES.PROGRESS_BAR]: ProgressBars,
  [TYPES.PROGRESS_CIRCLE]: ProgressCircles,
  [TYPES.TABLE]: Tables,
  [TYPES.TEXT]: Texts,
  [TYPES.TIMELINE]: Timelines,
};

export const RendererPropTypes = PropTypes.oneOfType([tableShape, progressBarShape, progressCircleShape, textShape, cardShape, timelineShape]).isRequired;
