export interface Company {
  name: string;
  logo: string | React.ReactNode;
  alt: string;
}

export interface Expertise {
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface NavItemProps {
  icon: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export interface SidebarProps {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<PageType>>;
}

export interface ContainerProps {
  children: React.ReactNode;
  background_color?: string;
  border_radius?: string;
  className?: string;
}

export interface CarouselSlideProps {
  project: Project;
  isActive: boolean;
  onSlideClick: (projectId: number) => void;
  position?: 'middle' | 'lateral';
}

export interface ProjectCarouselProps {
  className?: string;
}

export interface ExpertiseCardProps {
  expertise: Expertise;
}

export interface CompanyLogoProps {
  company: Company;
}

export type PageType = 'Home' | 'Projects' | 'Services' | 'About me';

export type ThemeType = 'Light' | 'Dark';

export type LanguageType = 'pt' | 'en';