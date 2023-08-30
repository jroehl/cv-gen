import { CV, CardColumnItem, TextColumnItem, TimelineColumnItem } from '../types';
import { notEmpty } from '../utils';
import { PhantomBusterLinkedInScrape } from './types';

// Assuming the interfaces PhantomBusterLinkedInScrape and CV are already defined
export function mapLinkedInDataToCV(linkedInData: PhantomBusterLinkedInScrape | undefined, defaults: CV) {
  if (!linkedInData) return undefined;
  const skills = linkedInData.skills?.filter((skill) => !skill?.name?.includes('maximum'));

  const cv: CV = {
    config: defaults.config,
    contact: {
      name: linkedInData.general?.fullName || defaults.contact.name,
      phone: linkedInData.details?.phone || defaults.contact.phone,
      mail: linkedInData.details?.mail || defaults.contact.mail,
      website: linkedInData.details?.websites || defaults.contact.website,
      address: linkedInData.general?.location || defaults.contact.address,
      portals: defaults.contact.portals,
    },
    columns: {
      left: [
        ...defaults.columns.left.slice(0, 3),
        skills?.length
          ? ({
              title: 'Tools, methods, frameworks',
              type: 'TEXT',
              values: [
                {
                  value: skills?.map((skill) => skill.name).filter(notEmpty),
                },
              ],
            } as TextColumnItem)
          : defaults.columns.left[3],
        linkedInData.general?.description
          ? ({
              title: 'About me',
              type: 'TEXT',
              values: [
                {
                  value: linkedInData.general.description,
                },
              ],
            } as TextColumnItem)
          : defaults.columns.left[4],
      ],
      right: [
        linkedInData.schools?.length
          ? ({
              title: 'Education',
              type: 'TIMELINE',
              values: linkedInData.schools.map(({ dateRange, schoolName, degree }) => ({
                title: degree,
                duration: dateRange,
                location: schoolName,
              })),
            } as TimelineColumnItem)
          : defaults.columns.right[0],
        linkedInData.licences?.length
          ? ({
              title: 'Certificates and qualifications',
              type: 'TIMELINE',
              values: linkedInData.licences.map(({ name, date = '', companyName }) => ({
                title: name,
                duration: date,
                location: companyName,
              })),
            } as TimelineColumnItem)
          : defaults.columns.right[1],
        linkedInData.jobs?.length
          ? ({
              title: 'Work',
              type: 'TIMELINE',
              reactPdfProps: {
                break: true,
                wrap: true,
              },
              values: linkedInData.jobs.map(({ dateRange, jobTitle, companyName, location }) => ({
                title: companyName,
                duration: dateRange,
                type: jobTitle,
                location,
              })),
            } as TimelineColumnItem)
          : defaults.columns.right[2],
        linkedInData.accomplishments?.projects?.length
          ? ({
              title: 'Selected projects',
              type: 'CARD',
              reactPdfProps: {
                break: true,
                wrap: true,
              },
              values: linkedInData.accomplishments.projects.map(({ title, date, description, skills = '' }) => ({
                skills,
                title,
                text: description,
                duration: date,
              })),
            } as CardColumnItem)
          : defaults.columns.right[3],
      ],
    },
  };

  return cv;
}
