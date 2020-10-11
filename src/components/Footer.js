import React from 'react'
import {ReactComponent as Twitter} from '../twitter.svg'
import {ReactComponent as Github} from '../github.svg'
import {ReactComponent as Logo} from '../logo.svg'
import {ReactComponent as ReactLogo} from '../reactlogo.svg'
import { ExternalLink } from 'react-external-link';
import '../footer.css'

const Footer = () => {
    return (
        <div className='footer'>
        <ExternalLink href='https://twitter.com/akwesi_ansah' target="_blank">
        <Twitter></Twitter>
        </ExternalLink>
       <ExternalLink href='https://github.com/PeterKwesiAnsah' target="_blank">
       <Github ></Github>  
       </ExternalLink>
       <div className='footer-logo__box'>
       <Logo></Logo>
       <span>&copy;2020 made with&nbsp;<ReactLogo></ReactLogo></span>
       </div>
     
            
        </div>
    )
}

export default Footer



/*https://twitter.com/DiPiero20*/