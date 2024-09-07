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
  DoorArrowRight28Filled,
  DoorArrowRight28Regular
} from "@fluentui/react-icons";
import { LoginFlow } from "../models/types/appTypes";
import { handleLogin } from "../services/msalHelper";
import { useMsal } from "@azure/msal-react";

const DoorArrow = bundleIcon(DoorArrowRight28Filled, DoorArrowRight28Regular);


const SignIn: React.FC = () => {
    const { instance } = useMsal();
    const handleSignInOption = (option: LoginFlow ) => {
        handleLogin(instance,option);
    };
  return (
    <>
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <MenuButton appearance="transparent" icon={<DoorArrow />}>
                    Sign In
                </MenuButton>
            </MenuTrigger>

            <MenuPopover>
            <MenuList>
                <MenuItem onClick={() => handleSignInOption(LoginFlow.Popup)}>using Popup</MenuItem>
                <MenuItem onClick={() => handleSignInOption(LoginFlow.Redirect)}>using Redirect</MenuItem>
            </MenuList>
            </MenuPopover>
        </Menu>
    </>
  )
};

export default SignIn;
