import { CV, CardColumnItem, TextColumnItem, TimelineColumnItem } from '../types';
import { notEmpty } from '../utils';
import { PhantomBusterLinkedInScrape } from './types';

export function mapLinkedInDataToCV({ general, details, skills, schools, licences, jobs, accomplishments }: PhantomBusterLinkedInScrape, defaults: CV) {
  const projects = accomplishments?.projects?.slice(0, 6);
  const projectsByCompanyUrl = keyByCompanyId(projects);
  const jobsByCompanyUrl = keyByCompanyId(jobs);

  const cv: CV = {
    config: defaults.config,
    contact: {
      image: general?.imgUrl || defaults.contact.image,
      name: general?.fullName || defaults.contact.name,
      phone: details?.phone || defaults.contact.phone,
      mail: details?.mail || defaults.contact.mail,
      website: defaults.contact.website,
      address: general?.location || defaults.contact.address,
      portals: defaults.contact.portals,
      description: general?.description || defaults.contact.description,
    },
    columns: {
      left: [
        ...defaults.columns.left,
        {
          title: 'Tools, methods, frameworks',
          type: 'TEXT',
          values: [
            {
              value: skills
                ?.filter((skill) => !skill?.name?.includes('maximum'))
                .map((skill) => skill.name)
                .filter(notEmpty),
            },
          ],
        } as TextColumnItem,
        {
          title: 'About me',
          type: 'TEXT',
          values: [
            {
              value: general?.description,
            },
          ],
        } as TextColumnItem,
      ],
      right: [
        {
          title: 'Education',
          type: 'TIMELINE',
          values: schools?.slice(0, 2).map(({ dateRange, schoolName, degree }) => {
            return {
              title: degree,
              duration: dateRange,
              location: schoolName,
            };
          }),
        } as TimelineColumnItem,
        {
          title: 'Certificates and qualifications',
          type: 'TIMELINE',
          values: licences?.map(({ name, date = '', companyName }) => {
            return {
              title: name,
              duration: date,
              location: companyName,
            };
          }),
        } as TimelineColumnItem,
        {
          title: 'Work',
          type: 'TIMELINE',
          reactPdfProps: {
            break: true,
          },
          values: jobs?.map(({ dateRange, jobTitle, companyName, location, companyUrl }) => {
            const linkTo = projectsByCompanyUrl?.[getCompanyIdFromUrl(companyUrl) as string]?.i;
            return {
              title: companyName,
              duration: dateRange,
              type: jobTitle,
              location,
              linkTo: linkTo !== undefined ? `right-3-${linkTo}` : undefined,
            };
          }),
        } as TimelineColumnItem,
        {
          title: 'Selected projects',
          type: 'CARD',
          reactPdfProps: {
            break: true,
          },
          values: projects?.map(({ title, date, description, skills = '', companyUrl }) => {
            return {
              skills,
              title,
              text: description,
              duration: date,
              type: jobsByCompanyUrl?.[getCompanyIdFromUrl(companyUrl) as string]?.jobTitle,
            };
          }),
        } as CardColumnItem,
      ],
    },
  };

  return cv;
}
function keyByCompanyId<T extends { companyUrl?: string }>(items?: T[]) {
  return items?.reduce((acc, item, i) => {
    const companyId = getCompanyIdFromUrl(item.companyUrl);
    return companyId
      ? {
          ...acc,
          [companyId]: { ...item, i },
        }
      : acc;
  }, {} as Record<string, T & { i: number }>);
}
function getCompanyIdFromUrl(url?: string) {
  return url?.match(/\/(\d+)/)?.[1];
}
