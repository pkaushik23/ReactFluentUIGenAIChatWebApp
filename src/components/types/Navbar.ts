import { FluentIcon } from "@fluentui/react-icons";

export interface IBasicNavItem {
    icon: FluentIcon,
    title: string,
    isActive:boolean
}

export interface INavItemClickable extends IBasicNavItem {
    url : string
    index : number
}

export interface INavItem extends INavItemClickable{
    isHeading : boolean,
    isGroup: boolean,
    groupItems: INavItemClickable[]
}

export interface INavSection{
    title: string,
    icon: FluentIcon
    items: INavItem[],
}

export interface INavBarInfo{
    appInfo: INavItemClickable,
    header: INavSection,
    footer: INavSection,
    body: INavSection
}

