export const Nav = ({children, className}) => {
    return(
        <>
        <h1>Chef's Cellar</h1>
        <nav className={className ?? 'navbar'}>
            {children}
        </nav>
        </>
    )
}