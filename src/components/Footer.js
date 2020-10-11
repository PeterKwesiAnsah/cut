import React from 'react'
import {ReactComponent as Twitter} from '../twitter.svg'
import {ReactComponent as Github} from '../github.svg'
import {ReactComponent as Logo} from '../logo.svg'
import {ReactComponent as ReactLogo} from '../reactlogo.svg'
import {Link} from 'react-router-dom'
import '../footer.css'

const Footer = () => {
    return (
        <div className='footer'>
        <Link to ='/twitter' target="_blank">
        <Twitter></Twitter>
        </Link>
       <Link to ='/github' target="_blank">
       <Github ></Github>  
       </Link>
       <div className='footer-logo__box'>
       <Logo></Logo>
       <span>&copy;2020 made with&nbsp;<ReactLogo></ReactLogo></span>
       </div>
     
            
        </div>
    )
}

export default Footer



/*https://twitter.com/DiPiero20*/