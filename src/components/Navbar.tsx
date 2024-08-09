import React from 'react';
import { Label, makeStyles} from '@fluentui/react-components';
import { Link } from 'react-router-dom';

const styles = makeStyles({
  parent : { 
    display:'flex',
    flexDirection:'column',
    height:'100%'
  },
  footer:{
    flexShrink:0,
    marginTop:'auto'
  }
});
const Navbar: React.FC = () => {
  const cssClass = styles();
  return (
    <div className={cssClass.parent}>
      <header>
        <Label  size='large'>Navbar Header</Label>
        <br/>
        <Label  size='small'>lorem ipsum</Label>
      </header>
      <div className="navbar-body">
        <ul>
          <li>
            <Link to="/">Main Page</Link>
          </li>
          <li>
            <Link to="profile">About Us</Link>
          </li>
          <li>
            <Link to="settings">Settings</Link>
          </li>
        </ul>
        {/* <Menu>

          <MenuList>
            <MenuItem>Section 1</MenuItem>
            <MenuItem>Section 2</MenuItem>
            <MenuItem>Section 3</MenuItem>
          </MenuList>
        </Menu> */}
      </div>
      <footer  className={cssClass.footer}>
        <Label  size='large'>Navbar Footer</Label>
        <br/>
        <Label  size='small'>lorem ipsum</Label>
      </footer>
    </div>
  );
}

export default Navbar;
