// assets
import { IconSettings } from '@tabler/icons';

// constant
const icons = {
    IconSettings
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const account = {
  id: 'account',
  title: 'Account',
  // caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'account',
      title: 'Account',
      type: 'item',
      url: '/account',
      icon: icons.IconSettings,
      target: true
    }
  ]
};

export default account;
