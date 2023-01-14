import { HeaderTabs } from "../components/Header";


export default function Navbar({ user }) {
    const { isLoggedIn, name: username } = user;
    const initial = isLoggedIn ? username.slice(0, 1) : null;

    return (
        <HeaderTabs user={{
          name: 'Puri Virakarin',
          image: 'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        }} tabs={['Home', 'Menu', 'Settings']}  />
        );
    }