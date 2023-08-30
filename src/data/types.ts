export interface PhantomBusterLinkedInScrape {
  general?: General;
  jobs?: Job[];
  schools?: School[];
  details?: Details;
  skills?: Skill[];
  allSkills?: string;
  interests?: Interests;
  accomplishments?: Accomplishments;
  recommendations?: Recommendations;
  licences?: Licence[];
  query?: string;
  timestamp?: string;
}

export interface Accomplishments {
  languages?: string[];
  projects?: Project[];
}

export interface Project {
  title?: string;
  date?: string;
  companyUrl?: string;
  description?: string;
  skills?: string;
}

export interface Details {
  linkedinProfile?: string;
  websites?: string;
  twitter?: string;
  twitterProfileUrl?: string;
  im?: string;
  birthday?: string;
  connectedOn?: string;
  phone?: string;
  mail?: string;
}

export interface General {
  imgUrl?: string;
  fullName?: string;
  headline?: string;
  location?: string;
  profileUrl?: string;
  connections?: string;
  connectionsCount?: number;
  connectionDegree?: string;
  description?: string;
  subscribers?: number;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  userId?: string;
  backgroundUrl?: string;
  vmid?: string;
  linkedinSalesNavigatorUrl?: string;
  mutualConnectionsUrl?: string;
  connectionsUrl?: string;
  company?: string;
  school?: string;
}

export interface Interests {
  companies?: Company[];
  groups?: Company[];
  schools?: Company[];
}

export interface Company {
  url?: string;
  name?: string;
  count?: number;
}

export interface Job {
  companyUrl?: string;
  companyName?: string;
  logoUrl?: string;
  jobTitle?: string;
  dateRange?: string;
  duration?: string;
  description?: string;
  location?: string;
}

export interface Licence {
  name?: string;
  credentialUrl?: string;
  companyName?: string;
  date?: string;
}

export interface Recommendations {
  receivedRecommendations?: Recommendation[];
  givenRecommendations?: Recommendation[];
}

export interface Recommendation {
  profileUrl?: string;
  text?: string;
}

export interface School {
  schoolUrl?: string;
  schoolName?: string;
  logoUrl?: string;
  degree?: string;
  dateRange?: string;
}

export interface Skill {
  name?: string;
  endorsements?: number;
}
