import React from 'react';
import ReactDOM from 'react-dom';
import Swiper from 'swiper';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faMobileAlt, faFileDownload, faEnvelope, faTabletAlt, faUniversalAccess, faListOl, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { 
    faAws,
    faCss3,
    faGit,
    faGulp,
    faGithub,
    faHtml5,
    faJava,
    faJs,
    faNodeJs,
    faNpm,
    faPython,
    faPhp,
    faReact,
    faSass,
    faMailchimp,
} from '@fortawesome/free-brands-svg-icons';

let standardIcons = [faDesktop, faMobileAlt, faFileDownload, faEnvelope, faListOl, faPaperPlane, faTabletAlt, faUniversalAccess];
let brandIcons = [faAws,faCss3,faGit,faGulp,faGithub,faHtml5,faJava,faJs,faNodeJs,faNpm,faPython,faPhp,faReact,faSass,faMailchimp];

library.add(standardIcons, brandIcons);

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.compareLogos = this.compareLogos.bind(this);
        this.morphCycle = this.morphCycle.bind(this);
        this.morph = this.morph.bind(this);
    }

    compareLogos (logo1, logo2) {
 
      let dLogo = Snap.select('#brand_D');
      let gLogo = Snap.select('#brand_G');
      let noseLogo = Snap.select('#brand_nose');

      noseLogo.animate({
        opacity: "1",
        transform: "matrix(0.504261,-0.0012042,0.000960593,0.402248,-521.09,-8.88001)"
      }, 1000, mina.easein);

      gLogo.animate({
        opacity:"1",
        transform:"matrix(0.18,-0,-0,0.18,0,0)"
      }, 600, mina.linear);

      dLogo.animate({
        opacity: "1",
        transform:"matrix(0.18,-0,-0,0.18,0,0)"
      }, 1000, mina.easein);

    }

    componentDidMount() {
   
      this.morphCycle(0);

      window.addEventListener('scroll', () => {

          let sTop = window.scrollY;
    
          if (sTop > 1100) {
              document.querySelector('.technologies').classList.add('present');
          } else if (sTop > 580) {
              document.querySelector('.section__history').classList.add('present');
          }
          
      });

    }

    morphCycle(counter) {

      this.morph(brandIcons[counter]).then(() => {
  
        if (counter == brandIcons.length - 1) {
          counter = 0;
        } else {
          counter++;
        }

        this.morphCycle(counter);
      });

    }

    morph(brand) {

      return new Promise(function(resolve, reject) {

        let originalPath = "M91.8,45c-3.9,0-5.9,2.3-7.7,4.3c-1.7,2-3.2,3.7-6.2,3.7s-4.5-1.7-6.2-3.7C70,47.3,68,45,64,45c-3.9,0-5.9,2.3-7.7,4.3   c-1.7,2-3.2,3.7-6.2,3.7c-3,0-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3c-3.9,0-5.9,2.3-7.7,4.3c-1.7,2-3.2,3.7-6.2,3.7   c-3,0-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3c-0.6,0-1,0.4-1,1s0.4,1,1,1c3,0,4.5,1.7,6.2,3.7c1.8,2,3.8,4.3,7.7,4.3   c3.9,0,5.9-2.3,7.7-4.3c1.7-2,3.2-3.7,6.2-3.7c3,0,4.5,1.7,6.2,3.7c1.8,2,3.8,4.3,7.7,4.3c3.9,0,5.9-2.3,7.7-4.3   c1.7-2,3.2-3.7,6.2-3.7c3,0,4.5,1.7,6.2,3.7c1.8,2,3.8,4.3,7.7,4.3c3.9,0,5.9-2.3,7.7-4.3c1.7-2,3.2-3.7,6.2-3.7c0.6,0,1-0.4,1-1   S92.4,45,91.8,45z";
        let transformingSVG = Snap('#svgMorpher');
        let squiggly = Snap.select('#squiggly');

        transformingSVG.animate({ viewBox: `0 0 ${brand.icon[0]} ${brand.icon[1]}` }, 1000, mina.easein);

        squiggly.animate({ d: brand.icon[4] }, 2000, mina.easein, function () {

          squiggly.animate({
            d: originalPath
          }, 300, mina.easein, function () {
            document.querySelector('#squiggly').setAttribute('d', "M91.8,45c-3.9,0-5.9,2.3-7.7,4.3c-1.7,2-3.2,3.7-6.2,3.7s-4.5-1.7-6.2-3.7C70,47.3,68,45,64,45c-3.9,0-5.9,2.3-7.7,4.3   c-1.7,2-3.2,3.7-6.2,3.7c-3,0-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3c-3.9,0-5.9,2.3-7.7,4.3c-1.7,2-3.2,3.7-6.2,3.7   c-3,0-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3c-0.6,0-1,0.4-1,1s0.4,1,1,1c3,0,4.5,1.7,6.2,3.7c1.8,2,3.8,4.3,7.7,4.3   c3.9,0,5.9-2.3,7.7-4.3c1.7-2,3.2-3.7,6.2-3.7c3,0,4.5,1.7,6.2,3.7c1.8,2,3.8,4.3,7.7,4.3c3.9,0,5.9-2.3,7.7-4.3   c1.7-2,3.2-3.7,6.2-3.7c3,0,4.5,1.7,6.2,3.7c1.8,2,3.8,4.3,7.7,4.3c3.9,0,5.9-2.3,7.7-4.3c1.7-2,3.2-3.7,6.2-3.7c0.6,0,1-0.4,1-1   S92.4,45,91.8,45z");
            resolve();
          });


          transformingSVG.animate({ viewBox: `0 0 100 100` }, 300, mina.easein);

        });

      });

    }

    render() {
        return (
            <div className="wrapper">

                <nav className="nav">
            
                    <div className="nav__section">
                        <img className="left" id="navLogo" src="img/logo_v2.0.svg"/>
                    </div>

                    <div className="nav__section nav__links">

                        <div className="nav__link">
                            <a href="https://github.com/ScriptEngineer" className="github__link" target="_blank" >
                                <div className="nav__icon">
                                    <FontAwesomeIcon icon={['fab', 'github']} />
                                </div>
                                <h3 className="right">ScriptEngineer</h3>
                            </a>                          
                        </div>

                        <div className="nav__link">
                            <a href="gonzyResume.pdf" type="application/octet-stream" download="gonzyResume.pdf">
                                <div className="nav__icon">
                                    <FontAwesomeIcon icon="file-download" />
                                </div>

                                <h3 className="right">resume</h3>
                            </a>
                        </div>
                                
                        <div className="nav__link">
                            <a href="mailto:gonzydesigns@gmail.com">
                                <div className="nav__icon">
                                    <FontAwesomeIcon icon="envelope" />
                                </div>

                                <h3 className="right navMailName">gonzydesigns@gmail.com</h3>
                            </a>
                        </div>

                    </div>
                            
                </nav>

                <div className="mainBody">

                    <div className="section__hero">
                      <div className="row">

                        <div className="section__hero__presentation">
                          
                          <svg id="svgMorpher" height="100px" width="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
                            <g>
                              <path id="squiggly" style={{ fill: '#00ACE1' }} d="M91.8,45c-3.9,0-5.9,2.3-7.7,4.3c-1.7,2-3.2,3.7-6.2,3.7s-4.5-1.7-6.2-3.7C70,47.3,68,45,64,45c-3.9,0-5.9,2.3-7.7,4.3   c-1.7,2-3.2,3.7-6.2,3.7c-3,0-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3c-3.9,0-5.9,2.3-7.7,4.3c-1.7,2-3.2,3.7-6.2,3.7   c-3,0-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3c-0.6,0-1,0.4-1,1s0.4,1,1,1c3,0,4.5,1.7,6.2,3.7c1.8,2,3.8,4.3,7.7,4.3   c3.9,0,5.9-2.3,7.7-4.3c1.7-2,3.2-3.7,6.2-3.7c3,0,4.5,1.7,6.2,3.7c1.8,2,3.8,4.3,7.7,4.3c3.9,0,5.9-2.3,7.7-4.3   c1.7-2,3.2-3.7,6.2-3.7c3,0,4.5,1.7,6.2,3.7c1.8,2,3.8,4.3,7.7,4.3c3.9,0,5.9-2.3,7.7-4.3c1.7-2,3.2-3.7,6.2-3.7c0.6,0,1-0.4,1-1   S92.4,45,91.8,45z"></path>
                            </g>
                          </svg>
                        
                        </div>

                        <div className="section__hero__branding">
                          <h1>gonzy designs</h1>
                          <p>passionate software development.</p>
                        </div>

                      </div>
                    </div>

                    <div className="section__history">

                        <h2 className="section__title">Striving for new heights in Coding Experience</h2>
                        <div className="entry">
                            <div className="entry__content">
                                <p className="entry__time">Sep. 2016 - Present</p>
                                <h2 className="entry__title">Web Developer</h2>
                            </div>
                            <div className="entry__link">
                                <div className="triangle"></div>
                                <a href="https://www.utsouthwestern.edu/" target="_blank">
                                    <img src="img/utsw-logo.svg" width="240" />
                                </a>
                            </div>
                        </div>

                        <div className="entry">
                            <div className="entry__content">
                                <p className="entry__time">2013 - 2016</p>
                                <h2 className="entry__title">Freelance Web Designer/Developer</h2>
                            </div>
                            <div className="entry__link">
                                <div className="triangle"></div>
                                <a href="https://www.maxi-ms.com/" target="_blank">
                                    <img src="img/maxi-logo.png" width="120" />
                                </a>
                                <a href="https://www.llantec.com/" target="_blank">
                                    <img src="img/llantec-logo.png" width="120" />
                                </a>
                            </div>
                        </div>

                        <div className="entry">
                            <div className="entry__content">
                                <p className="entry__time">Aug. 2011 - July 2015</p>
                                <h2 className="entry__title">B.A. Communication Technologies</h2>
                            </div>
                            <div className="entry__link">
                                <div className="triangle"></div>
                                <a href="https://www.uta.edu/uta/" target="_blank">
                                    <img src="img/uta-logo-alt.png" width="120" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="section__technologies">
                        <h2 className="section__title center">Advanced Experience with Industry Leading Technologies</h2>

                        <div id="technologyDetail">
                            <div className='technology'></div>
                            <div className='technologyTitle'></div>
                        </div>

                        <div className="technologies">

                            <div className="icon__row">
                                <FontAwesomeIcon icon={['fab', 'html5']} className="technologies__icon" size="4x" data-title="HTML5" />
                                <FontAwesomeIcon icon={['fab', 'js']} className="technologies__icon" size="4x" data-title="JS6" />
                                <FontAwesomeIcon icon={['fab', 'sass']} className="technologies__icon" size="4x" data-title="MailChimp" />
                                <FontAwesomeIcon icon={['fab', 'css3']} className="technologies__icon" size="4x" data-title="CSS3" />
                                <FontAwesomeIcon icon={['fab', 'git']} className="technologies__icon" size="4x" data-title="Git" />
                                <FontAwesomeIcon icon={['fab', 'github']} className="technologies__icon" size="4x" data-title="GitHub" />
                            </div>

                            <div className="icon__row">
                                <FontAwesomeIcon icon={['fab', 'react']} className="technologies__icon" size="4x" data-title="React" />
                                <FontAwesomeIcon icon={['fab', 'python']} className="technologies__icon" size="4x" data-title="FontAwesome" />
                                <FontAwesomeIcon icon={['fab', 'aws']} className="technologies__icon" size="4x"  data-title="Amazon Web Services" />
                                <FontAwesomeIcon icon={['fab', 'node-js']} className="technologies__icon" size="4x" data-title="NodeJS"  />
                                <FontAwesomeIcon icon={['fab', 'npm']} className="technologies__icon" size="4x" data-title="NPM"  />
                                <img className="technologies__icon" src="img/brands/apache.svg" data-title="Bootstrap"  />
                            </div>

                            <div className="icon__row">
                                <FontAwesomeIcon icon={['fab', 'java']} className="technologies__icon" size="4x" data-title="Java"  />
                                <FontAwesomeIcon icon={['fab', 'mailchimp']} className="technologies__icon" size="4x" data-title="MailChimp" />
                                <img className="technologies__icon" src="img/brands/alfresco.svg" data-title="Alfresco"  />
                                <img className="technologies__icon" src="img/brands/jQuery.svg" data-title="jQuery"  />
                                <img className="technologies__icon" src="img/brands/foundationLogo.png" data-title="Foundation"  />
                                <FontAwesomeIcon icon={['fab', 'gulp']} className="technologies__icon" size="4x" data-title="Gulp"  />
                            </div>

                            <div className="icon__row">
                                <img className="technologies__icon" src="img/brands/bootstrap.png" data-title="Bootstrap"  />
                                <img className="technologies__icon" src="img/brands/webpack.png" data-title="Webpack"  />
                                <img className="technologies__icon" src="img/brands/mysql.png" data-title="MySQL"  />
                                <img className="technologies__icon" src="img/brands/analytics.svg" data-title="Google Analytics"  />
                                <img className="technologies__icon" src="img/brands/logo-localist.svg" data-title="Localist"  />
                                <img className="technologies__icon" src="img/brands/heroku.svg" data-title="Heroku"  />
                            </div>

                            <div className="icon__row">
                              <img className="technologies__icon" src="img/brands/tinymce.svg" data-title="Bootstrap"  />
                              <img className="technologies__icon" src="img/brands/bluepay.svg" data-title="Bootstrap"  />
                              <img className="technologies__icon" src="img/brands/postgresql.svg" data-title="Bootstrap"  />
                              <img className="technologies__icon" src="img/brands/django.svg" data-title="Webpack"  />
                              <img className="technologies__icon" src="img/brands/wagtail.svg" data-title="MySQL"  />
                              <FontAwesomeIcon icon={['fab', 'php']} className="technologies__icon" size="4x" data-title="PHP"  />
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('root'));
