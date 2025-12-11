import React from 'react';

export interface Project {
  title: string;
  description: string;
  link: string;
  repo: string;
  status: 'live' | 'coming-soon';
  image?: string;
}

export interface Service {
  title: string;
  price: string;
  features: string[];
  icon: 'globe' | 'shopping-cart' | 'cpu';
}

export type RobotState = 'idle' | 'pointing' | 'excited' | 'thinking';

export interface RobotContextType {
  state: RobotState;
  setRobotState: (state: RobotState) => void;
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}