export default (colors, circleColors) => ({
  config: {
    leftColumnWidth: 40,
    pageNumberText: 'RESUME',
    romanizedPageNumbers: true,
    printFriendly: false,
    font: {
      family: 'Roboto',
      src: 'https://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf',
    },
    colors,
  },
  contact: {
    name: 'Johann Röhl',
    phone: '+49 (0)30 62937411',
    mail: 'mail@johannroehl.de',
    website: 'https://johannroehl.de',
    address: {
      city: '12043 Berlin',
      country: 'Germany',
    },
    portals: [
      {
        icon:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMAAQIDBQYHCQsSExQVHiAjJygtMzg/QEdJX2FkaHh+g4WGiJWXm6OvtLzFys7a4ubo9ff5+/2JyqqEAAAAuUlEQVQ4y9XS2Q6CMBQE0CLgjrjgvituaF1Q7v9/mtJpjKStvmmcp2k5Ib1NGSstj/uRzYzxKM3BMoKtABQYwQVgYAQ7gLYR1MV3/uaUjYjiRZ59O44ftLwceh9TFB8VLWTOXJRk4upBgZPMqZwFiWibiJ45OxlwIyUzA+CxLImrAz2LWR3ZmxrQFdONsRi+gisOhvEr2J+qf1gD2NhfqSCUt0mSK/fwW0D/C6qBSPpC0WoSYOV/fOB3aV1kKMnUK6QAAAAASUVORK5CYII=',
        url: 'www.linkedin.com/in/johannroehl',
      },
      {
        icon:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABUFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9GqXNDAAAAb3RSTlMAAQIDBAUGBwgJCgsMDxASExQVFhccHh8jJSYnKisvMTM0OENFRkdKS0xQUVdZXF1eYWJjZGhpbG1vcHFzd3h5fH6Cg4WGi4yOj5GUlZiam52io6Wmqq2yusHDx8jMztXZ2tze4uTm6evz9ff5+/2KM+TrAAABbElEQVQYGY3B+0NLYRzH8c9zLDsZK8wwiZBbud9yl+SSZS6RzKSV0sre//9vnu9zVrZz9oPXS/+44zcWljd/N6oTJfWRv7fJrtVxp15u8g891kfULV4i47nTrgNr9PElUke8Rl8flXDfgPk7K3RZnGwA9xVcwytKlR/Uq89mak3eF6XzeEfkxW08J8lFCnLyynh1eQ8xkVKOYkYkt4UZUsoFzAfpBGZBaXs3MAO6jRlWxkXMMX3GW1FWAXNZP/FqynKYB2rhVdUHZlYbeIvKijDTquO1lHUQc0vzmJIyJjDndAnzRmluFXNYJYIxpUxjtp20THDFqUv8juCppHEYjV7B+s1KQcHQqRdtEsOSoibbJ/Ov8c4qmGPHW5kKbA3kvkI7UlCmo5VX8ASmXG5/vEeJAh2n1fGJ9qjk1DFI4qp2RDVozEw9VmKQ4Lq63MVrKrEPr3VGPQ4twS8lCkA1r7Ty3Eslou+PivpvfwGDLLKBb3fNFAAAAABJRU5ErkJggg==',
        url: 'www.github.com/jroehl',
      },
    ],
  },
  columns: {
    left: [
      {
        heading: 'Personal',
        type: 'TABLE',
        values: [
          {
            key: 'Name',
            value: 'Johann Röhl',
          },
          {
            key: 'Nationality',
            value: 'German',
          },
        ],
      },
      {
        heading: 'Skills',
        type: 'PROGRESS_BAR',
        values: [
          [
            {
              skill: 'Node.Js',
              proficiency: 90,
            },
            {
              skill: 'Go',
              proficiency: 75,
            },
            {
              skill: 'Python',
              proficiency: 60,
            },
          ],
          [
            {
              skill: 'JavaScript / TypeScript',
              proficiency: 90,
            },
            {
              skill: 'Gatsby.Js',
              proficiency: 85,
            },
            {
              skill: 'React.Js',
              proficiency: 90,
            },
            {
              skill: 'HTML5 / CSS3',
              proficiency: 80,
            },
            {
              skill: 'SASS',
              proficiency: 70,
            },
          ],
          [
            {
              skill: 'Amazon Web Services',
              proficiency: 80,
            },
            {
              skill: 'NoSQL DB',
              proficiency: 75,
            },
            {
              skill: 'SQL DB',
              proficiency: 70,
            },
          ],
        ],
      },
      {
        heading: 'Languages',
        type: 'PROGRESS_CIRCLE',
        reactPdfProps: {
          break: true,
        },
        values: [
          {
            skill: 'german',
            proficiency: 100,
            color: circleColors[0],
          },
          {
            skill: 'english',
            proficiency: 85,
            color: circleColors[1],
          },
          {
            skill: 'spanish',
            proficiency: 35,
            color: circleColors[2],
          },
        ],
      },
      {
        heading: 'Tools, methods, frameworks',
        type: 'TEXT',
        values: [
          {
            value: [
              'Agile',
              'Apache',
              'AWS Lambda',
              'AWS DynamoDB',
              'AWS Cloudformation',
              'AWS RDS',
              'AWS Route53',
              'Bash',
              'Bitbucket',
              'Chrome developer tools',
              'CiCd',
              'CircleCi',
              'CMS',
              'Contentful',
              'CSV',
              'Docker',
              'GIT',
              'GitHub',
              'GoogleCloud',
              'Gsuite',
              'Holacracy',
              'JIRA',
              'JSON',
              'JSX',
              'Kanban',
              'Kubernetes',
              'Linux',
              'Mac',
              'MongoDB',
              'Netlify',
              'OKRs',
              'PostgreSQL',
              'SASS',
              'Scrum',
              'SCSS',
              'Slack',
              'VSCode',
              'XML',
              'Yaml',
            ],
          },
        ],
      },
    ],
    right: [
      {
        heading: 'Education',
        type: 'TIMELINE',
        values: [
          {
            heading: 'Studies of media informatics - BA',
            fromTo: '10/2014 - 10/2017',
            location: 'Beuth University of Applied Sciences, Berlin',
          },
          {
            heading: 'Education photographer - Journeyman',
            fromTo: '08/2011 - 01/2014',
            location: 'adP Photostudios GmbH, Hamburg',
          },
          {
            heading: 'Training rescue paramedic',
            fromTo: '08/2010 - 01/2011',
            location: 'ASB Hamburg, Hamburg',
          },
          {
            heading: 'Abitur (equivalent to A-levels)',
            fromTo: '08/1997 - 08/2008',
            location: 'Baltic Gesamtschule / Johanneum zu Lübeck, Lübeck',
          },
        ],
      },
      {
        heading: 'Certificates and qualifications',
        type: 'TIMELINE',
        values: [
          {
            heading: 'Grundlagen des Onlinemarketings',
            fromTo: '11/2019',
            location: 'Google',
          },
          {
            heading: 'AWS Certified Solutions Architect - Associate',
            fromTo: '11/2018',
            location: 'Amazon Web Services',
          },
          {
            heading: 'Machine Learning',
            fromTo: '02/2018',
            location: 'Coursera / Andrew Ng',
          },
        ],
      },
      {
        heading: 'Work',
        type: 'TIMELINE',
        reactPdfProps: {
          break: true,
        },
        values: [
          {
            heading: 'Software developer & Web designer | Freelance',
            fromTo: '03/2014 - today',
            location: 'Berlin',
            website: 'www.johannroehl.de',
          },
          {
            heading: 'FullStack JS developer | Contentful GmbH',
            fromTo: '06/2019 - today',
            location: 'Berlin',
            website: 'www.contentful.com',
          },
          {
            heading: 'Software developer | MYCS GmbH',
            fromTo: '01/2018 - 06/2019',
            location: 'Berlin',
            website: 'www.mycs.com',
          },
          {
            heading: 'Working student | MYCS GmbH',
            fromTo: '01/2017 - 01/2018',
            location: 'Berlin',
            website: 'www.mycs.com',
          },
          {
            heading: 'Working student | GIGA',
            fromTo: '08/2015 - 01/2018',
            location: 'Hamburg',
            website: 'www.giga-hamburg.de',
          },
          {
            heading: 'Photographer | adP Photostudios GmbH',
            fromTo: '02/2014 - 04/2014',
            location: 'Hamburg',
            website: 'www.adp-photostudios.de',
          },
          {
            heading: 'Employee IT administration | ZVS GmbH',
            fromTo: '06/2009 - 05/2010',
            location: 'Hamburg',
          },
        ],
      },
      {
        heading: 'Experience abroad',
        type: 'TIMELINE',
        values: [
          {
            heading: 'Canada',
            fromTo: '09/2018 - 05/2009',
            location: 'Work and Travel YMP',
          },
          {
            heading: 'Venezuela - Caracas',
            fromTo: '06/2006 - 08/2006',
            location: 'Student exchange Colegio Humboldt',
          },
        ],
      },
      {
        heading: 'Selected projects - employed',
        type: 'CARD',
        reactPdfProps: {
          break: true,
        },
        values: [
          [
            {
              heading: 'CiCd process Netsuite',
              subHeading: ['Bash', 'CircleCi', 'Go', 'Netsuite', 'NodeJs', 'SuiteTalk'],
              text:
                'Conception and implementation of a CiCd workflow to allow adopting modern development practices in Netsuite. Implementation of an open source cli for useful file handling features in Netsuite.',
            },
            {
              heading: 'ECS, EKS setup and integration',
              subHeading: ['AWS', 'Bash', 'Docker', 'Kubernetes'],
              text: 'Setup of a cloud container orchestration service (EKS and ECS) and migration of existing APIs.',
            },
            {
              heading: 'Warehouse API',
              subHeading: ['AWS', 'CircleCi', 'Go', 'IoT', 'NodeJs', 'PostgreSQL'],
              text: 'Design and implementation of an API automating the label prints in the warehouse.',
            },
          ],
        ],
      },
      {
        heading: 'Selected projects - freelance',
        type: 'CARD',
        values: [
          [
            {
              heading: 'Multilingual company website',
              subHeading: ['AWS Gateway', 'AWS Lambda', 'FlowFact API', 'GatsbyJs', 'IS24 API', 'Netlify', 'NodeJS', 'ReactJs'],
              text:
                'Design and implementation of a multilingual website, with a serverless contact form and an individual solution for the display and synchronization of company real estate.',
            },
            {
              heading: 'Twitter Project',
              subHeading: ['AngularJS', 'GraphQL', 'MongoDB', 'Python', 'TwitterAPI'],
              text:
                'Development of tools for the collection of Tweets from Twitter APIs, and processing of these data for network analyses for a social science research project on the linkages of Arab Islamists on Twitter.',
            },
          ],
        ],
      },
    ],
  },
});
