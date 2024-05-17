// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill,IconBook } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconBook
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'courses',
  title: 'Course',
  type: 'group',
  children: [
    {
      id: 'course',
      title: 'Course',
      type: 'item',
      url: '/course',
      icon: icons.IconBook,
      breadcrumbs: false
    }
  ]
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/utils/util-shadow',
    //   icon: icons.IconKey,
    //   breadcrumbs: false
    // },
 
};

export default utilities;
