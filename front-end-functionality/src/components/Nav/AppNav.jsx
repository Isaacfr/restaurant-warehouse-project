import { Link } from 'react-router-dom';
import { Nav, NavItem, NavSection } from './index.js';

// This will be the one I use as my actual nav bar
export const AppNav = () => {
    return (
        <>
        <Nav>
            <NavSection>
                <NavItem>
                    <Link to="/" className="nav-link">Home</Link>
                </NavItem>
                <NavItem>
                    <Link to="/edit" className="nav-link">Edit</Link>
                </NavItem>
            </NavSection>
        </Nav>
        </>
    );
}