import React from 'react';
import ReactDOM from 'react-dom';
import Swiper from 'swiper';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faMobileAlt, faFileDownload, faEnvelope, faTabletAlt, faUniversalAccess, faListOl, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { 
    faAws,
    faCss3,
    faFontAwesome,
    faGit,
    faGulp,
    faGithub,
    faHtml5,
    faJava,
    faJs,
    faJsfiddle,
    faNodeJs,
    faNpm,
    faPython,
    faPhp,
    faReact,
    faSass,
    faMailchimp,
} from '@fortawesome/free-brands-svg-icons';

library.add(faDesktop, faMobileAlt, faFileDownload, faEnvelope, faListOl, faPaperPlane, faTabletAlt, faUniversalAccess);
library.add(
  faAws,
  faCss3,
  faFontAwesome,
  faGit,
  faGulp,
  faGithub,
  faHtml5,
  faJava,
  faJs,
  faJsfiddle,
  faNodeJs,
  faNpm,
  faPython,
  faPhp,
  faReact,
  faSass,
  faMailchimp,
);

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.toggleTechnology = this.toggleTechnology.bind(this);
    }

    componentDidMount() {

				let icons = document.querySelectorAll('.technologies__icon');
				
        icons.forEach(el => {
            el.addEventListener('click', () => {
                let technolgy = el.outerHTML;
                document.querySelector('#technologyDetail .technology').classList.add('reveal');
                document.querySelector('#technologyDetail .technology').innerHTML = technolgy;
                document.querySelector('#technologyDetail .technologyTitle').innerHTML = `<h2><a target="_blank" href="${el.dataset.link}">${el.dataset.title}</a></h2>`;
                document.querySelector('#technologyDetail').classList.add('reveal');
                document.querySelector('.technologies').classList.add('blur--alt');
                document.addEventListener('click', e => {
                    if (!e.target.classList.contains('technologies__icon') && !e.target.classList.contains('technologyTitle')) {
                        document.querySelector('#technologyDetail .technology').classList.remove('reveal');
                        document.querySelector('#technologyDetail').classList.remove('reveal');
                        document.querySelector('.technologies').classList.remove('blur--alt');
                        document.querySelector('#technologyDetail .technology').innerHTML = '';
                        document.querySelector('#technologyDetail .technologyTitle').innerHTML = '';
                    }
                });
            });
        });

        let sliders = document.querySelectorAll('.swiper-container');

        sliders.forEach(el => {
            new Swiper(el, {
                speed: 400,
                spaceBetween: 100,
                loop: true,
                autoplay: {
                    delay: 5000
                },
            });
        });

        window.addEventListener('scroll', () => {

            let sTop = window.scrollY;
            //let sHeight = window.innerHeight;

            if (sTop > 1100) {
                document.querySelector('.technologies').classList.add('present');
            } else if (sTop > 580) {
                document.querySelector('.section__history').classList.add('present');
            }
            
        });

    }

    toggleTechnology(e) {
        if (e.target.classList.contains('reveal')){
            e.target.classList.remove('reveal');
        } else {
            e.target.classList.add('reveal');
        }

        if (document.querySelector('.technologies').classList.contains('blur')) {
            document.querySelector('.technologies').classList.remove('blur');
        } else {
            document.querySelector('.technologies').classList.add('blur');
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="nav">
            
                    <div className="nav__section">
                        <img className="left" id="navLogo" src="img/logo.svg"/>
                        <h1 className="brand__title left">GONZY DESIGNS</h1>
                    </div>

                    <div className="nav__section nav__links">

                        <div className="nav__link">
                            <a href="https://github.com/ScriptEngineer" className="github__link" target="_blank" >
                                <div className="nav__icon">
                                    <FontAwesomeIcon icon={['fab', 'github']} />
                                </div>
                            </a>

                            <a href="https://github.com/ScriptEngineer" className="resume__link">
                                <h3 className="right">ScriptEngineer</h3>
                            </a>                            
                        </div>

                        <div className="nav__link">
                            <a href="gonzyResume.pdf" type="application/octet-stream" download="gonzyResume.pdf">
                                <div className="nav__icon">
                                    <FontAwesomeIcon icon="file-download" />
                                </div>
                            </a>
                            
                            <a href="img/gonzyResume.pdf" className="resume__link" type="application/octet-stream" download="gonzyResume.pdf">
                                <h3 className="right">resume</h3>
                            </a>
                        </div>
                                
                        <div className="nav__link">
                            <a href="mailto:gonzydesigns@gmail.com">
                                <div className="nav__icon">
                                    <FontAwesomeIcon icon="envelope" />
                                </div>
                            </a>
                            <a href="mailto:gonzydesigns@gmail.com">
                                <h3 className="right navMailName">gonzydesigns@gmail.com</h3>
                            </a>
                        </div>

                    </div>
                            
                </div>

                <div className="mainBody">

                    <div className="section__hero">

                        <div className="hero__img">
                            <img src="img/devices.png" />
                        </div>

                        <div className="section__featured">
                        
                            <div className="feature">
                                <div className="featured__content">
                                    <h3>Fully Responsive</h3>
                                    <div className="swiper-container">
                                        <div className="swiper-wrapper">

                                            <div className="swiper-slide">
                                                <FontAwesomeIcon icon={['fas', 'desktop']} className="technologies__icon" size="4x" />
                                            </div>
                                            <div className="swiper-slide">
                                                <FontAwesomeIcon icon={['fas', 'tablet-alt']} className="technologies__icon" size="4x" />
                                            </div>
                                            <div className="swiper-slide">
                                                <FontAwesomeIcon icon={['fas', 'mobile-alt']} className="technologies__icon" size="4x" />
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="feature">
                                <div className="featured__content">
                                    <div className="swiper-container">

                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <h3>Improved Accessibility</h3>
                                                <FontAwesomeIcon icon={['fas', 'universal-access']} className="technologies__icon" size="4x" />
                                            </div>
                                            
                                            <div className="swiper-slide">
                                                <h3>Better Page Ranking</h3>
                                                <FontAwesomeIcon icon={['fas', 'list-ol']} className="technologies__icon" size="4x" />
                                            </div>

                                            <div className="swiper-slide">
                                                <h3>Faster Deployments</h3>
                                                <FontAwesomeIcon icon={['fas', 'paper-plane']} className="technologies__icon" size="4x" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="feature">
                                <div className="featured__content">
                                    <h3>Full stack ready</h3>
                                    <div className="swiper-container">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide"><FontAwesomeIcon icon={['fab', 'node-js']} className="technologies__icon" size="4x" data-title="NodeJS" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" /></div>
                                            <div className="swiper-slide"><FontAwesomeIcon icon={['fab', 'react']} className="technologies__icon" size="4x" data-title="React" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3"/></div>
                                            <div className="swiper-slide"><FontAwesomeIcon icon={['fab', 'css3']} className="technologies__icon" size="4x" data-title="CSS3" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                        </div>

                    </div>

                    <div className="section__history">

                        <h2 className="section__title">Striving for new heights in Coding Experience</h2>
                        <div className="entry">
                            <div className="entry__content">
                                <p className="entry__time">Sep. 2016 - Present</p>
                                <h2 className="entry__title">Front End Web Developer</h2>
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
                                <FontAwesomeIcon icon={['fab', 'html5']} className="technologies__icon" size="4x" data-title="HTML5" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <FontAwesomeIcon icon={['fab', 'js']} className="technologies__icon" size="4x" data-title="JS6" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <FontAwesomeIcon icon={['fab', 'sass']} className="technologies__icon" size="4x" data-title="MailChimp" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <FontAwesomeIcon icon={['fab', 'css3']} className="technologies__icon" size="4x" data-title="CSS3" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <FontAwesomeIcon icon={['fab', 'git']} className="technologies__icon" size="4x" data-title="Git" data-link="https://git-scm.com/" />
                                <FontAwesomeIcon icon={['fab', 'github']} className="technologies__icon" size="4x" data-title="GitHub" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                            </div>

                            <div className="icon__row">
                                <FontAwesomeIcon icon={['fab', 'react']} className="technologies__icon" size="4x" data-title="React" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <FontAwesomeIcon icon={['fab', 'python']} className="technologies__icon" size="4x" data-title="FontAwesome" data-link="https://fontawesome.com/" />
                                <FontAwesomeIcon icon={['fab', 'aws']} className="technologies__icon" size="4x"  data-title="Amazon Web Services" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <FontAwesomeIcon icon={['fab', 'node-js']} className="technologies__icon" size="4x" data-title="NodeJS" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <FontAwesomeIcon icon={['fab', 'npm']} className="technologies__icon" size="4x" data-title="NPM" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <img className="technologies__icon" src="img/brands/apache.svg" data-title="Bootstrap" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                            </div>

                            <div className="icon__row">
                                <FontAwesomeIcon icon={['fab', 'java']} className="technologies__icon" size="4x" data-title="Java" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <FontAwesomeIcon icon={['fab', 'mailchimp']} className="technologies__icon" size="4x" data-title="MailChimp" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3"/>
                                <img className="technologies__icon" src="img/brands/alfresco.svg" data-title="Alfresco" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <img className="technologies__icon" src="img/brands/jQuery.png" data-title="jQuery" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <img className="technologies__icon" src="img/brands/foundationLogo.png" data-title="Foundation" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <FontAwesomeIcon icon={['fab', 'gulp']} className="technologies__icon" size="4x" data-title="Gulp" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                            </div>

                            <div className="icon__row">
                                <img className="technologies__icon" src="img/brands/bootstrap.png" data-title="Bootstrap" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <img className="technologies__icon" src="img/brands/webpack.png" data-title="Webpack" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <img className="technologies__icon" src="img/brands/mysql.png" data-title="MySQL" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <img className="technologies__icon" src="img/brands/analytics.svg" data-title="Google Analytics" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <img className="technologies__icon" src="img/brands/logo-localist.svg" data-title="Localist" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                                <img className="technologies__icon" src="img/brands/heroku.svg" data-title="Heroku" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                            </div>

                            <div className="icon__row">
                              <img className="technologies__icon" src="img/brands/tinymce.svg" data-title="Bootstrap" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                              <img className="technologies__icon" src="img/brands/bluepay.svg" data-title="Bootstrap" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                              <img className="technologies__icon" src="img/brands/postgresql.svg" data-title="Bootstrap" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                              <img className="technologies__icon" src="img/brands/django.svg" data-title="Webpack" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                              <img className="technologies__icon" src="img/brands/wagtail.svg" data-title="MySQL" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                              <FontAwesomeIcon icon={['fab', 'php']} className="technologies__icon" size="4x" data-title="PHP" data-link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" />
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('root'));
