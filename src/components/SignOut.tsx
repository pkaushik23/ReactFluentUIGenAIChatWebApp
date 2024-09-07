import * as React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import {
  bundleIcon,
  SignOut24Filled,
  SignOut24Regular,
  
} from "@fluentui/react-icons";
import { useMsal } from "@azure/msal-react";
import { LoginFlow } from "../models/types/appTypes";
import { handleLogOut } from "../services/msalHelper";

const DoorArrow = bundleIcon(SignOut24Filled, SignOut24Regular);

const SignOut: React.FC = () => {
    const { instance } = useMsal();
    const handleSignOutOption = (option: LoginFlow ) => {
        handleLogOut(instance,option);
    };
  return (
    <>
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <MenuButton appearance="transparent" icon={<DoorArrow />}>
                    Sign Out
                </MenuButton>
            </MenuTrigger>

            <MenuPopover>
            <MenuList>
                <MenuItem onClick={() => handleSignOutOption(LoginFlow.Popup)}>using Popup</MenuItem>
                <MenuItem onClick={() => handleSignOutOption(LoginFlow.Redirect)}>using Redirect</MenuItem>
            </MenuList>
            </MenuPopover>
        </Menu>
    </>
  )
};

export default SignOut;
