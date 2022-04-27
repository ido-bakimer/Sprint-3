const { Link, NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
    return <header className="app-header flex space-between align-center pad20">
        <h3>Books store.חרטה</h3>

        <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/book">Our books</NavLink>
        </nav>
    </header>
}

export const AppHeader = withRouter(_AppHeader)