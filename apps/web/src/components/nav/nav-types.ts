export type MegaMenuItem = {
  icon: string;
  title: string;
  subtitle: string;
  href: string;
};

export type MegaMenuColumn = {
  heading: string;
  items: MegaMenuItem[];
};

export type DropdownItem = {
  title: string;
  subtitle: string;
  count: number;
  href: string;
  image: string;
  icon: string;
};

export type DropdownContent = {
  items: DropdownItem[];
};
