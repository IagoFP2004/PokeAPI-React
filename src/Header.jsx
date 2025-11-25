import './header.css';

export function Header() {
    return (
        <div class="header">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/640px-International_Pok%C3%A9mon_logo.svg.png' alt='Logo Pokemon' width={120} />
            <ul>
                <li>Inicio</li>
                <li>About</li>
            </ul>
        </div>
    );
    }