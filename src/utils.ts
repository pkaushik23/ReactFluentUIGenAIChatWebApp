import { Board20Filled, Board20Regular, Board24Filled, Board24Regular, BoxMultiple20Filled, BoxMultiple20Regular, bundleIcon, HeartPulse20Filled, HeartPulse20Regular, NotePin20Filled, NotePin20Regular, Person20Filled, Person20Regular } from '@fluentui/react-icons';
import { INavBarInfo, INavItemClickable, INavSection } from './components/types/Navbar';

const personIcon = bundleIcon(Person20Filled, Person20Regular);
const homeIcon = bundleIcon(Board20Filled, Board20Regular);
const infoIcon = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const settingsIcon = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const contactIcon = bundleIcon(NotePin20Filled, NotePin20Regular);

export class Utility {
    // Static method for capitalizing the first letter of a string
    public static generateSampleNavbar = (): INavBarInfo => {
        // Example app info
        const appInfo: INavItemClickable = {
            icon: personIcon,
            title: 'Sample App',
            isActive: true,
            url: '/',
            index: 0,
        };

        // Example header section
        const header: INavSection = {
            title: 'Navigation header',
            icon: settingsIcon, 
            items: [
                {
                    icon: homeIcon, 
                    title: 'Home',
                    isActive: true,
                    url: '/',
                    index: 0,
                    isHeading: false,
                    isGroup: false,
                    groupItems: [],
                },
                {
                    icon: infoIcon, 
                    title: 'About',
                    isActive: false,
                    url: 'profile',
                    index: 1,
                    isHeading: false,
                    isGroup: false,
                    groupItems: [],
                },
            ],
        };

        // Example footer section
        const footer: INavSection = 
            {
                title: 'Footer Links',
                icon: settingsIcon, // Replace with actual icon component
                items: [
                    {
                        icon: contactIcon, // Replace with actual icon component
                        title: 'Contact Us',
                        isActive: false,
                        url: '/contact',
                        index: 2,
                        isHeading: false,
                        isGroup: false,
                        groupItems: [],
                    },
                ],
            }
        ;

        // Example body sections
        const body: INavSection = 
            {
                title: 'Dashboard',
                icon: personIcon, // Replace with actual icon component
                items: [
                    {
                        icon: homeIcon, // Replace with actual icon component
                        title: 'Overview',
                        isActive: false,
                        url: 'settings',
                        index: 3,
                        isHeading: false,
                        isGroup: false,
                        groupItems: [],
                    },
                    {
                        icon: infoIcon, // Replace with actual icon component
                        title: 'Reports',
                        isActive: false,
                        url: 'profile',
                        index: 4,
                        isHeading: true,
                        isGroup: true,
                        groupItems: [
                            {
                                icon: settingsIcon, // Replace with actual icon component
                                title: 'Monthly Report',
                                isActive: false,
                                url: 'settings',
                                index: 5,
                            },
                            {
                                icon: homeIcon, // Replace with actual icon component
                                title: 'Annual Report',
                                isActive: false,
                                url: 'profile',
                                index: 6,
                            },
                        ],
                    },
                ],
            }
        ;

        return {
            appInfo,
            header,
            footer,
            body,
        };
    };
}