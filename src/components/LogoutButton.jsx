import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = ({isMobile, toggleMenu}) => {
    const { logout } = useAuth0();

    const mobileLogout = () => {
        toggleMenu();
        logout({ logoutParams: { returnTo: window.location.origin } });
    }

    return (
        isMobile ?
            <span className='dropdown-item' onClick={() => mobileLogout()}>
                Log Out
            </span>
            :
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                <span>Log Out</span>
            </button>
    );
};

export default LogoutButton;
