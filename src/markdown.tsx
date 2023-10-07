import {
  CV,
  CardColumnItem,
  CardValues,
  ProgressBarColumnItem,
  ProgressCircleColumnItem,
  ProgressValues,
  TableColumnItem,
  TableValues,
  TextColumnItem,
  TextValues,
  TimelineColumnItem,
  TimelineValues,
} from './types';
import { isCardColumn, isProgressBarColumn, isProgressCircleColumn, isTableColumn, isTextColumn, isTimelineColumn } from './utils';

export function generateMarkdown(data: CV) {
  return `---
title: CV ${data.contact.name}
description: ${data.contact.description}
---

# ${data.contact.name}

<img style="float: right; padding-top: 20px;" src="${data.contact.image}" alt="profile picture" width="100"/>

| | |
|---|---|
| **Phone** | [${data.contact.phone}](tel:${data.contact.phone.replace(/ /g, '')}) |
| **Mail** | [${data.contact.mail}](mailto:${data.contact.mail}) |
| **Website** | [${data.contact.website.replace(/^http[s]?:\/\//, '')}](${data.contact.website}) |
| **Address** | ${data.contact.address} |
${data.contact.portals
  .map(({ url }) => ({
    name: url.includes('github') ? 'GitHub' : url.includes('xing') ? 'Xing' : url.includes('linkedin') ? 'LinkedIn' : undefined,
    url,
  }))
  .filter(({ name }) => name)
  .map(({ name, url }) => `| **${name}** | [${url.replace(/^http[s]?:\/\//, '')}](${url}) |`)
  .join('\n')}

---
${data.columns.left.map(formatColumnItemToMarkdown).join('\n\n')}
${data.columns.right.map(formatColumnItemToMarkdown).join('\n\n')}
`;
}

function formatColumnItemToMarkdown(
  item: TableColumnItem | ProgressBarColumnItem | ProgressCircleColumnItem | TextColumnItem | TimelineColumnItem | CardColumnItem
): string {
  if (isCardColumn(item)) {
    return formatCardColumnItem(item);
  }
  if (isProgressBarColumn(item)) {
    return formatProgressBarColumnItem(item);
  }
  if (isProgressCircleColumn(item)) {
    return formatProgressCircleColumnItem(item);
  }
  if (isTableColumn(item)) {
    return formatTableColumnItem(item);
  }
  if (isTextColumn(item)) {
    return formatTextColumnItem(item);
  }
  if (isTimelineColumn(item)) {
    return formatTimelineColumnItem(item);
  }
  console.error(`No Markdown formatter set up for`, item);
  return '';
}
function formatTableColumnItem(item: TableColumnItem): string {
  // Format and return the Markdown for a TABLE column item
  return `
## ${item.title}
${formatTableValues(item.values)}
`;
}
function formatProgressBarColumnItem(item: ProgressBarColumnItem): string {
  // Format and return the Markdown for a PROGRESS_BAR column item
  return `
## ${item.title}
${formatProgressValues(item.values)}
`;
}
function formatProgressCircleColumnItem(item: ProgressCircleColumnItem): string {
  // Format and return the Markdown for a PROGRESS_CIRCLE column item
  return `
## ${item.title}
${formatProgressValues([item.values])}
`;
}
function formatTextColumnItem(item: TextColumnItem): string {
  // Format and return the Markdown for a TEXT column item
  return `
## ${item.title}
${formatTextValues(item.values)}
`;
}
function formatTimelineColumnItem(item: TimelineColumnItem): string {
  // Format and return the Markdown for a TIMELINE column item
  return `
## ${item.title}
${formatTimelineValues(item.values)}
`;
}
function formatCardColumnItem(item: CardColumnItem): string {
  // Format and return the Markdown for a CARD column item
  return `
## ${item.title}
${formatCardValues(item.values)}
`;
}
function formatTableValues(values: TableValues[]): string {
  // Format and return the Markdown for TABLE values
  return values.map((value) => `- **${value.key}**: ${value.value}`).join('\n');
}
function formatProgressValues(values: ProgressValues[][]): string {
  // Format and return the Markdown for PROGRESS_BAR or PROGRESS_CIRCLE values
  return values
    .map((valueSet) => {
      return valueSet.map((value) => `- **${value.skill}**: ${roundUpToNearest10th(value.proficiency)} / 10`).join('\n');
    })
    .join('\n');

  function roundUpToNearest10th(num: number): number {
    return Math.floor(num / 10);
  }
}

function formatTextValues(values: TextValues[]): string {
  // Format and return the Markdown for TEXT values
  return values.map((value) => (typeof value.value === 'string' ? value.value : value.value.join(', '))).join('\n');
}

function formatTimelineValues(values: TimelineValues[]): string {
  // Format and return the Markdown for TIMELINE values
  return values
    .map((value) => {
      return `
- **${value.title}**  *(${value.duration})*  
  Location: ${value.location}${value.website ? ` | Website: ${value.website}` : ''}
    `;
    })
    .join('\n');
}

function formatCardValues(values: CardValues[]): string {
  // Format and return the Markdown for CARD values
  return values
    .map((value) => {
      return `
- **${value.title}** (${value.duration})  
${typeof value.text === 'string' ? value.text : value.text.join('\n')}  

  *${(Array.isArray(value.skills) ? value.skills.join(', ') : value.skills).replace(/^(\w+:)/, '**$1**')}*`;
    })
    .join('\n');
}
