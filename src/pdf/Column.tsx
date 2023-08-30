import ReactPDF, { View } from '@react-pdf/renderer';
import { Alignment, AllColumnItemTypes, Config } from '../types';
import { isCardColumn, isProgressBarColumn, isProgressCircleColumn, isTableColumn, isTextColumn, isTimelineColumn } from '../utils';
import { Cards } from './renderer/Cards';
import { ProgressBars } from './renderer/ProgressBars';
import { ProgressCircles } from './renderer/ProgressCircles';
import { Tables } from './renderer/Tables';
import { Texts } from './renderer/Texts';
import { Timelines } from './renderer/Timelines';

interface Props {
  alignment: Alignment;
  parts: AllColumnItemTypes[];
  styles: ReactPDF.Styles;
  config: Config;
}

export const Column = ({ alignment, parts, styles, config }: Props) => {
  const columnStyle = styles[alignment];
  if (!columnStyle) {
    console.error(`No column style found for "${alignment}"`);
    return null;
  }

  return (
    <View style={columnStyle} wrap>
      {parts.map((part, i) => {
        const defaultProps = { styles, config, alignment, index: i };
        if (isCardColumn(part)) {
          return <Cards key={part.title} {...defaultProps} {...part} />;
        }
        if (isProgressBarColumn(part)) {
          return <ProgressBars key={part.title} {...defaultProps} {...part} />;
        }
        if (isProgressCircleColumn(part)) {
          return <ProgressCircles key={part.title} {...defaultProps} {...part} />;
        }
        if (isTableColumn(part)) {
          return <Tables key={part.title} {...defaultProps} {...part} />;
        }
        if (isTextColumn(part)) {
          return <Texts key={part.title} {...defaultProps} {...part} />;
        }
        if (isTimelineColumn(part)) {
          return <Timelines key={part.title} {...defaultProps} {...part} />;
        }
        console.error(`No Renderer set up for`, part);
        return null;
      })}
    </View>
  );
};
