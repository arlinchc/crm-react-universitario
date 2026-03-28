import {Link} from 'react-router-dom'

function Navbar(){
    return(
        <nav className='bg-slate-900 text-white px-8 py-4 flex gap-6 shadow-md'>
            <Link to="/" 
            className="hover:text-sky-400 transition-colors duration-300">
                Inicio
            </Link>
            <Link to="/about" 
             className="hover:text-sky-400 transition-colors duration-300">
                Acerca de</Link>
            <Link to="/contact"
               className="hover:text-sky-400 transition-colors duration-300">
                Contacto</Link>
        </nav>
    )
}
export default Navbar
