import React from 'react';
import ReactDOM from 'react-dom';
import SwiperCore, {Pagination} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
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

const standardIcons = [faDesktop, faMobileAlt, faFileDownload, faEnvelope, faListOl, faPaperPlane, faTabletAlt, faUniversalAccess];
const brandIcons = [faAws,faCss3,faGit,faGulp,faGithub,faHtml5,faJava,faJs,faNodeJs,faNpm,faPython,faPhp,faReact,faSass,faMailchimp];

SwiperCore.use(Pagination);

library.add(standardIcons, brandIcons);

export default class App extends React.Component {

    constructor(props) {
        super(props);

        if (window.innerWidth < 500) {
          this.state = {
            size: 'small'
          }
        } else {
          this.state = {
            size: 'large'
          }
        }


        this.checkView = this.checkView.bind(this);
        this.compareLogos = this.compareLogos.bind(this);
        this.cycleNav = this.cycleNav.bind(this);
        this.morphCycle = this.morphCycle.bind(this);
        this.morph = this.morph.bind(this);

    }

    checkView() {
    
      console.log(navigator.userAgent);

      window.onresize = () => {

        clearTimeout(resizeTimer);

        let resizeTimer = setTimeout(() => {

          if (window.innerWidth < 500) {
            this.setState({
              size: 'small'
            });
          } else {
            this.setState({
              size: 'large'
            });
          }

        }, 600);

      }
      
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

      this.checkView();

    }

    cycleNav() {
      let slider = document.querySelector('.nav__links').swiper;
      slider.slideNext();
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

      let navMenu;

      if (this.state.size == 'small') {

        navMenu = <Swiper pagination={{ el: '.nav__pagination' }} direction='vertical' loop='true' className="nav__section nav__links">

          <SwiperSlide className="nav__link">
            <a href="gonzyResume.pdf" type="application/octet-stream" download="gonzyResume.pdf">
              <div className="nav__icon">
                <FontAwesomeIcon icon="file-download" />
              </div>

              <h3 className="right">resume</h3>
            </a>
          </SwiperSlide>

          <SwiperSlide className="nav__link">
            <a href="mailto:gonzydesigns@gmail.com">
              <div className="nav__icon">
                <FontAwesomeIcon icon="envelope" />
              </div>

              <h3 className="right navMailName">gonzydesigns@gmail.com</h3>
            </a>
          </SwiperSlide>

          <div className="nav__pagination" onClick={this.cycleNav}></div>
        </Swiper>;

      } else {
        navMenu = <div className="nav__section nav__links">

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

        </div>;
      }

      return (
          <div className="wrapper">

              <nav className="nav">
          
                  <div className="nav__section">
                      <img className="left" id="navLogo" src="img/logo_v2.0.svg"/>
                  </div>

                  {navMenu}    

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
                              
                              <img src="img/maxi-logo.png" width="120" />
                              
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

                      <div className="technologies">

                          <div className="technologies__icon" title="HTML5">
                            <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5">
                              <FontAwesomeIcon icon={['fab', 'html5']} size="4x" />
                            </a>
                          </div>
                          
                          <div className="technologies__icon" title="Javascript">
                            <a href="https://www.javascript.com/">
                              <FontAwesomeIcon icon={['fab', 'js']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="Sass/SCSS">
                            <a href="https://sass-lang.com/">
                              <FontAwesomeIcon icon={['fab', 'sass']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="CSS3">
                            <a href="https://www.w3.org/Style/CSS/Overview.en.html">
                              <FontAwesomeIcon icon={['fab', 'css3']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="Git">
                            <a href="https://git-scm.com/">
                              <FontAwesomeIcon icon={['fab', 'git']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="Github">
                            <a href="https://github.com/">
                              <FontAwesomeIcon icon={['fab', 'github']} size="4x" />
                            </a>
                          </div>
        
                          <div className="technologies__icon" title="React">
                            <a href="https://reactjs.org/">
                              <FontAwesomeIcon icon={['fab', 'react']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="Python">
                            <a href="https://www.python.org/">
                              <FontAwesomeIcon icon={['fab', 'python']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="Amazon Web Services">
                            <a href="https://aws.amazon.com/">
                              <FontAwesomeIcon icon={['fab', 'aws']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="Node JS">
                            <a href="https://nodejs.org/en/">
                              <FontAwesomeIcon icon={['fab', 'node-js']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="Webpack">
                            <a href="https://webpack.js.org/">
                              <svg viewBox="0 0 875.7 875.7" xmlns="http://www.w3.org/2000/svg">
                                <path d="m387 0 387 218.9v437.9l-387 218.9-387-218.9v-437.9z" fill="#fff" />
                                <path d="m704.9 641.7-305.1 172.6v-134.4l190.1-104.6zm20.9-18.9v-360.9l-111.6 64.5v232zm-657.9 18.9 305.1 172.6v-134.4l-190.2-104.6zm-20.9-18.9v-360.9l111.6 64.5v232zm13.1-384.3 312.9-177v129.9l-200.5 110.3-1.6.9zm652.6 0-312.9-177v129.9l200.5 110.2 1.6.9z" fill="currentColor" />
                                <path className="darkGrey" d="m373 649.3-187.6-103.2v-204.3l187.6 108.3zm26.8 0 187.6-103.1v-204.4l-187.6 108.3zm-201.7-331.1 188.3-103.5 188.3 103.5-188.3 108.7z" fill="currentColor" />
                              </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Wagtail">
                            <a href="https://wagtail.io/">
                              <svg width="50px" viewBox="0 0 108 136" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
                                <g transform="matrix(1,0,0,1,2.18339,4.99063)">
                                  <g>
                                    <g>
                                      <g>
                                        <path d="M84.388,1.897L84.388,7.588C84.388,7.588 74.204,3.794 67.615,10.683C62.823,15.675 62.423,21.266 64.62,28.754C86.185,28.754 89.58,40.835 89.58,40.835L87.384,26.957L94.173,18.67C94.173,8.886 86.086,2.396 84.388,1.897Z" style={{ fill: 'white', fillRule: 'nonzero' }} />
                                      </g>
                                      <g>
                                        <circle cx="86.285" cy="15.875" r="2.596" />
                                      </g>
                                      <g>
                                        <g>
                                          <path d="M89.58,40.835C89.58,40.835 86.285,24.261 64.719,28.754C62.523,21.266 62.922,15.775 67.715,10.683C74.204,3.794 84.388,7.588 84.388,7.588L84.388,1.897C80.794,0.3 77.399,0 73.605,0C59.727,0 52.04,10.384 48.745,17.372L9.707,89.158L20.689,87.062L0.521,126L14.599,123.504L25.382,92.853C55.933,92.853 95.071,81.87 89.58,40.835Z" style={{ fillRule: 'nonzero' }} />
                                        </g>
                                      </g>
                                      <g>
                                        <path d="M102.759,26.957L94.173,18.67L87.384,26.957L102.759,26.957Z" style={{ fillRule: 'nonzero' }} />
                                      </g>
                                      <g>
                                        <path d="M30.474,83.967C30.474,83.967 31.472,83.767 33.269,83.368C35.067,82.968 37.563,82.369 40.558,81.571C42.055,81.171 43.653,80.672 45.35,80.073C47.048,79.474 48.845,78.875 50.542,78.076C52.339,77.377 54.136,76.479 55.933,75.48C57.731,74.482 59.428,73.384 61.025,72.086C61.425,71.786 61.824,71.487 62.223,71.087L63.422,70.089C64.12,69.39 64.919,68.691 65.618,67.892C66.317,67.193 66.916,66.395 67.515,65.596C67.815,65.197 68.114,64.797 68.414,64.398L69.212,63.2C69.412,62.8 69.712,62.401 69.911,62.002C70.111,61.602 70.311,61.203 70.61,60.803L71.209,59.605C71.409,59.206 71.609,58.807 71.708,58.407C72.008,57.609 72.307,56.81 72.607,56.011C72.807,55.212 73.106,54.414 73.306,53.715C73.506,53.016 73.605,52.217 73.805,51.618C73.905,50.919 74.005,50.32 74.105,49.621C74.204,49.022 74.304,48.423 74.304,47.924C74.404,47.425 74.404,46.926 74.504,46.426C74.604,44.629 74.604,43.631 74.604,43.631L76.201,43.731C76.201,43.731 76.101,44.829 76.002,46.626C75.902,47.125 75.902,47.624 75.802,48.124C75.702,48.723 75.702,49.322 75.502,49.921C75.403,50.52 75.203,51.219 75.103,51.918C74.903,52.616 74.704,53.315 74.504,54.114C74.304,54.913 74.005,55.612 73.705,56.51C73.406,57.309 73.106,58.108 72.707,59.006L71.509,61.403C71.309,61.802 71.01,62.201 70.81,62.7C70.51,63.1 70.311,63.499 70.011,63.899C69.911,64.098 69.712,64.298 69.612,64.498L69.212,65.097C68.913,65.496 68.613,65.895 68.314,66.295C67.615,67.094 67.016,67.892 66.217,68.591C65.518,69.39 64.719,69.989 63.921,70.788L62.723,71.786C62.323,72.086 61.924,72.385 61.425,72.685C59.727,73.883 57.93,74.981 56.133,75.979C54.336,76.878 52.439,77.777 50.642,78.475C48.845,79.174 47.048,79.773 45.35,80.273C43.653,80.772 42.055,81.271 40.458,81.571C37.463,82.269 34.867,82.868 33.07,83.168C31.472,83.767 30.474,83.967 30.474,83.967Z" style={{ fill: 'white', fillRule: 'nonzero' }} />
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Django">
                            <a href="https://www.djangoproject.com/">
                              <svg viewBox="0 0 256 326" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" width="50px">
                                <g fill="currentColor">
                                  <path d="M114.784 0h53.278v244.191c-27.29 5.162-47.38 7.193-69.117 7.193C33.873 251.316 0 222.245 0 166.412c0-53.795 35.93-88.708 91.608-88.708 8.64 0 15.222.68 23.176 2.717V0zm1.867 124.427c-6.24-2.038-11.382-2.717-17.965-2.717-26.947 0-42.512 16.437-42.512 45.243 0 28.046 14.88 43.532 42.17 43.532 5.896 0 10.696-.332 18.307-1.351v-84.707z" />
                                  <path d="M255.187 84.26v122.263c0 42.105-3.154 62.353-12.411 79.81-8.64 16.783-20.022 27.366-43.541 39.055l-49.438-23.297c23.519-10.93 34.901-20.588 42.17-35.327 7.61-15.072 10.01-32.529 10.01-78.445V84.261h53.21zM196.608 0h53.278v54.135h-53.278V0z" />
                                </g>
                              </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Foundation">
                            <a href="https://get.foundation/sites/docs/">
                              <span>Foundation</span>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Alfresco">
                            <a href="https://www.alfresco.com/">
                              <svg width="100%" height="100%" viewBox="0 0 90 90" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{fillRule:'evenodd',clipRule:'evenod',strokeLinejoin:'round', strokeMiterlimit:2}} >
                                <g transform="matrix(2.28754,0,0,-2.28754,-775.044,1604.98)">
                                  <g id="g672">
                                    <g id="g678" transform="matrix(1,0,0,1,358.33,681.938)">
                                      <path id="path680" d="M0,0L-5.339,5.339L-5.534,5.542C-8.596,8.604 -13.569,8.612 -16.631,5.549C-19.694,2.487 -19.694,-2.478 -16.631,-5.541C-13.569,-8.603 -8.603,-8.603 -5.54,-5.54L0,0Z" style={{fill:'white',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g682" transform="matrix(1,0,0,1,358.331,681.944)">
                                      <path id="path684" d="M0,0L0,-7.55L0.006,-7.832C0.006,-12.163 -3.505,-15.684 -7.836,-15.684C-12.167,-15.684 -15.678,-12.173 -15.678,-7.842C-15.678,-3.511 -12.166,-0 -7.835,-0L0,0Z" style={{fill:'white',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g686" transform="matrix(1,0,0,1,358.331,681.944)">
                                      <path id="path688" d="M0,0L0,-7.55L0.006,-7.832C0.006,-12.163 -3.505,-15.684 -7.836,-15.684C-12.167,-15.684 -15.678,-12.173 -15.678,-7.842C-15.678,-3.511 -12.166,-0 -7.835,-0L0,0Z" style={{fill:'white',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g690" transform="matrix(1,0,0,1,358.331,681.944)">
                                      <path id="path692" d="M0,0L0,-7.55L0.006,-7.832C0.006,-12.163 -3.505,-15.684 -7.836,-15.684C-12.167,-15.684 -15.678,-12.173 -15.678,-7.842C-15.678,-7.366 -15.636,-6.9 -15.555,-6.448C-12.497,-8.571 -8.266,-8.271 -5.541,-5.546L-0.001,-0.005L0,0Z" style={{fill:'white',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g694" transform="matrix(1,0,0,1,350.495,680.948)">
                                      <path className="alfGrey" id="path696" d="M0,0C-3.781,0 -6.846,-3.065 -6.846,-6.846C-6.846,-10.628 -3.781,-13.693 0,-13.693C3.781,-13.693 6.846,-10.628 6.846,-6.846L6.84,-6.555L6.84,0L0,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g698" transform="matrix(1,0,0,1,358.331,681.945)">
                                      <path id="path700" d="M0,0L5.339,-5.339L5.542,-5.534C8.605,-8.596 8.612,-13.569 5.549,-16.631C2.487,-19.694 -2.478,-19.694 -5.541,-16.631C-8.603,-13.569 -8.603,-8.603 -5.54,-5.54L0,0Z" style={{fill:'white',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g702" transform="matrix(1,0,0,1,353.495,675.7)">
                                      <path className="alfGrey" id="path704" d="M0,0C-2.674,-2.674 -2.674,-7.009 0,-9.682C2.674,-12.356 7.009,-12.356 9.682,-9.682C12.356,-7.009 12.356,-2.674 9.682,0L9.472,0.202L4.837,4.837L0.012,0.011L0,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g706" transform="matrix(1,0,0,1,358.331,681.945)">
                                      <path id="path708" d="M0,0L7.55,0L7.832,0.006C12.163,0.006 15.684,-3.505 15.684,-7.836C15.684,-12.167 12.173,-15.678 7.842,-15.678C3.511,-15.678 0,-12.166 0,-7.835L0,0Z" style={{fill:'white',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g710" transform="matrix(1,0,0,1,359.327,674.109)">
                                      <path className="alfGrey" id="path712" d="M0,0C0,-3.781 3.065,-6.846 6.846,-6.846C10.628,-6.846 13.693,-3.781 13.693,0C13.693,3.781 10.628,6.846 6.846,6.846L6.554,6.84L0,6.84L0,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g714" transform="matrix(1,0,0,1,358.33,681.946)">
                                      <path id="path716" d="M0,0L5.339,5.339L5.534,5.542C8.596,8.604 13.569,8.612 16.631,5.549C19.694,2.487 19.694,-2.478 16.631,-5.541C13.569,-8.603 8.603,-8.603 5.54,-5.54L0,0Z" style={{fill:'white',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g718" transform="matrix(1,0,0,1,364.575,677.109)">
                                      <path className="alfGrey" id="path720" d="M0,0C2.674,-2.674 7.009,-2.674 9.682,0C12.356,2.674 12.356,7.009 9.682,9.682C7.009,12.356 2.674,12.356 0,9.682L-0.202,9.471L-4.837,4.837L0,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g722" transform="matrix(1,0,0,1,358.329,681.945)">
                                      <path id="path724" d="M0,0L0,7.55L-0.006,7.832C-0.006,12.163 3.505,15.684 7.836,15.684C12.167,15.684 15.678,12.173 15.678,7.842C15.678,3.511 12.166,0 7.835,0L0,0Z" style={{fill:'white',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g726" transform="matrix(1,0,0,1,366.165,682.941)">
                                      <path id="path728" className="altGrey2" d="M0,0C3.781,0 6.846,3.065 6.846,6.846C6.846,10.628 3.781,13.693 0,13.693C-3.781,13.693 -6.846,10.628 -6.846,6.846L-6.84,6.555L-6.84,0L0,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g730" transform="matrix(1,0,0,1,358.329,681.944)">
                                      <path id="path732" d="M0,0L-5.339,5.339L-5.542,5.534C-8.605,8.596 -8.612,13.569 -5.549,16.631C-2.487,19.694 2.478,19.694 5.541,16.631C8.603,13.569 8.603,8.603 5.54,5.54L0,0Z" style={{fill:'white',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g734" transform="matrix(1,0,0,1,363.166,688.189)">
                                      <path id="path736" d="M0,0C2.674,2.674 2.674,7.009 0,9.682C-2.674,12.356 -7.009,12.356 -9.682,9.682C-12.356,7.009 -12.356,2.674 -9.682,0L-9.471,-0.202L-4.837,-4.837L-0.012,-0.011L0,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g738" transform="matrix(1,0,0,1,358.329,681.944)">
                                      <path id="path740" d="M0,0L-7.55,0L-7.832,-0.006C-12.163,-0.006 -15.684,3.505 -15.684,7.836C-15.684,12.167 -12.173,15.678 -7.842,15.678C-3.511,15.678 0,12.166 0,7.835L0,0Z" style={{fill:'white',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g742" transform="matrix(1,0,0,1,357.334,689.78)">
                                      <path id="path744" d="M0,0C0,3.781 -3.065,6.846 -6.846,6.846C-10.628,6.846 -13.693,3.781 -13.693,0C-13.693,-3.781 -10.628,-6.846 -6.846,-6.846L-6.554,-6.84L0,-6.84L0,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g746" transform="matrix(1,0,0,1,358.33,681.943)">
                                      <path id="path748" d="M0,0L-18.928,-0.007C-18.929,2.001 -18.163,4.009 -16.631,5.541C-13.569,8.603 -8.603,8.603 -5.54,5.54L0,0Z" style={{fill:'white',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g750" transform="matrix(1,0,0,1,352.085,686.78)">
                                      <path id="path752" d="M0,0L4.837,-4.837L-1.59,-4.837C-5.071,-4.837 -8.023,-7.105 -9.047,-10.244C-9.267,-10.072 -9.48,-9.885 -9.682,-9.682C-12.356,-7.009 -12.356,-2.674 -9.682,0C-7.009,2.674 -2.674,2.674 0,0" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g754" transform="matrix(1,0,0,1,352.101,686.78)">
                                      <path id="path756" className="alfGrey3" d="M0,0L3.829,-3.829L-1.318,-3.829L-1.609,-3.835C-4.744,-3.835 -7.386,-1.729 -8.199,1.146C-5.591,2.608 -2.23,2.23 -0.011,0.012L0,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g758" transform="matrix(1,0,0,1,357.331,689.781)">
                                      <path id="path760" className="alfGrey3" d="M0,0.016L0,-5.415L-3.639,-1.776L-3.85,-1.574C-6.066,0.642 -6.445,4 -4.987,6.607C-2.109,5.797 0,3.153 0,0.016Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g762" transform="matrix(1,0,0,1,363.187,688.194)">
                                      <path id="path764" className="alfGrey3" d="M0,0L-3.829,-3.829L-3.829,1.318L-3.835,1.609C-3.835,4.744 -1.729,7.386 1.145,8.199C2.608,5.591 2.23,2.23 0.012,0.011L0,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g766" transform="matrix(1,0,0,1,366.161,682.955)">
                                      <path id="path768" className="altGrey" d="M0.016,0L-5.415,0L-1.776,3.639L-1.574,3.85C0.642,6.066 4,6.445 6.607,4.987C5.797,2.109 3.153,0 0.016,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g770" transform="matrix(1,0,0,1,364.562,677.136)">
                                      <path id="path772" className="altGrey5" d="M0,0L-3.829,3.829L1.317,3.829L1.609,3.835C4.744,3.835 7.386,1.729 8.199,-1.146C5.591,-2.608 2.23,-2.23 0.011,-0.012L0,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g774" transform="matrix(1,0,0,1,359.342,674.141)">
                                      <path id="path776" className="altGrey5" d="M0,-0.016L0,5.415L3.639,1.776L3.85,1.574C6.066,-0.643 6.445,-4 4.987,-6.607C2.11,-5.797 0,-3.153 0,-0.016Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g778" transform="matrix(1,0,0,1,353.523,675.695)">
                                      <path id="path780" className="altGrey5" d="M-0.011,-0.011L3.829,3.829L3.829,-1.317L3.835,-1.609C3.835,-4.744 1.729,-7.386 -1.146,-8.198C-2.608,-5.591 -2.23,-2.23 -0.011,-0.011Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                                    <g id="g782" transform="matrix(1,0,0,1,350.519,680.937)">
                                      <path id="path784" className="altGrey5" d="M-0.016,0L5.415,0L1.776,-3.639L1.574,-3.85C-0.642,-6.066 -4,-6.446 -6.607,-4.987C-5.797,-2.11 -3.153,0 -0.016,0Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                    </g>
                              
                                  </g>
                                </g>
                              </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="jQuery">
                            <a href="https://jquery.com/">
                              <svg width="100%" height="100%" viewBox="0 0 105 100" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinejoin:'round',strokeMiterlimit:2}}>
                              <g transform="matrix(1,0,0,1,4.92923,-4.51474)">
                                <path d="M5.979,30.509C-2.357,42.489 -1.319,58.075 5.048,70.804C5.2,71.109 5.358,71.409 5.515,71.71C5.615,71.9 5.709,72.096 5.812,72.283C5.871,72.396 5.937,72.506 5.998,72.613C6.107,72.816 6.218,73.009 6.33,73.206C6.528,73.555 6.73,73.902 6.938,74.249C7.053,74.439 7.166,74.63 7.285,74.82C7.514,75.191 7.75,75.557 7.99,75.924C8.09,76.08 8.188,76.236 8.291,76.387C8.623,76.883 8.962,77.376 9.312,77.862C9.321,77.875 9.33,77.889 9.341,77.901C9.396,77.979 9.457,78.055 9.514,78.133C9.816,78.55 10.129,78.963 10.445,79.371C10.561,79.52 10.678,79.669 10.795,79.818C11.077,80.172 11.364,80.523 11.656,80.875C11.765,81.007 11.874,81.138 11.984,81.268C12.376,81.729 12.775,82.188 13.183,82.637C13.19,82.644 13.2,82.654 13.207,82.662C13.224,82.681 13.239,82.693 13.254,82.713C13.652,83.148 14.059,83.572 14.472,83.997C14.6,84.129 14.731,84.261 14.863,84.39C15.182,84.712 15.507,85.03 15.836,85.345C15.969,85.472 16.1,85.601 16.233,85.723C16.672,86.136 17.115,86.541 17.566,86.937C17.574,86.944 17.58,86.949 17.587,86.954C17.664,87.022 17.743,87.086 17.819,87.151C18.217,87.496 18.622,87.838 19.03,88.174C19.196,88.309 19.365,88.441 19.532,88.575C19.865,88.841 20.202,89.105 20.541,89.363C20.721,89.5 20.9,89.637 21.081,89.774C21.456,90.049 21.833,90.32 22.214,90.587C22.353,90.687 22.487,90.784 22.626,90.88C22.665,90.906 22.701,90.933 22.74,90.96C23.101,91.209 23.471,91.448 23.84,91.688C23.998,91.793 24.156,91.903 24.316,92.005C24.882,92.364 25.457,92.718 26.038,93.06C26.196,93.15 26.355,93.238 26.514,93.328C26.941,93.575 27.371,93.817 27.807,94.053C28.042,94.18 28.284,94.3 28.522,94.422C28.83,94.583 29.135,94.747 29.447,94.903C29.518,94.937 29.592,94.971 29.661,95.006C29.787,95.067 29.914,95.125 30.04,95.189C30.524,95.421 31.012,95.648 31.506,95.867C31.611,95.914 31.712,95.96 31.816,96.007C32.381,96.253 32.951,96.49 33.526,96.717C33.664,96.773 33.803,96.827 33.942,96.881C34.474,97.086 35.014,97.288 35.556,97.479C35.624,97.503 35.69,97.525 35.759,97.549C36.353,97.757 36.954,97.95 37.558,98.138C37.702,98.179 37.847,98.226 37.992,98.267C38.608,98.453 39.216,98.675 39.85,98.792C80.16,106.143 91.869,74.568 91.869,74.568C82.035,87.38 64.579,90.759 48.04,86.997C47.414,86.855 46.806,86.66 46.195,86.479C46.04,86.433 45.887,86.387 45.734,86.34C45.138,86.157 44.545,85.964 43.957,85.762C43.877,85.733 43.795,85.703 43.713,85.674C43.186,85.488 42.664,85.293 42.146,85.093C41.999,85.034 41.853,84.978 41.706,84.919C41.137,84.695 40.572,84.46 40.014,84.216C39.9,84.167 39.79,84.116 39.676,84.067C39.196,83.85 38.722,83.63 38.249,83.403C38.112,83.337 37.976,83.274 37.837,83.206C37.466,83.025 37.099,82.832 36.733,82.644C36.488,82.515 36.239,82.393 35.996,82.258C35.549,82.019 35.11,81.77 34.673,81.516C34.525,81.433 34.375,81.353 34.226,81.267C33.645,80.925 33.071,80.571 32.503,80.212C32.346,80.112 32.193,80.005 32.038,79.902C31.626,79.636 31.216,79.365 30.812,79.087C30.678,78.996 30.549,78.899 30.417,78.809C30.027,78.533 29.641,78.254 29.258,77.971C29.084,77.842 28.913,77.712 28.744,77.583C28.393,77.314 28.044,77.043 27.698,76.765C27.541,76.64 27.385,76.516 27.231,76.391C26.792,76.03 26.357,75.666 25.929,75.292C25.884,75.253 25.835,75.214 25.786,75.173C25.322,74.765 24.867,74.348 24.416,73.928C24.286,73.803 24.159,73.681 24.031,73.557C23.697,73.239 23.369,72.919 23.047,72.592C22.917,72.463 22.788,72.336 22.661,72.206C22.251,71.787 21.848,71.362 21.454,70.93C21.434,70.908 21.413,70.888 21.394,70.866C20.976,70.41 20.569,69.943 20.169,69.472C20.061,69.343 19.956,69.218 19.848,69.091C19.551,68.732 19.255,68.369 18.967,68.002C18.859,67.87 18.751,67.735 18.644,67.599C18.297,67.149 17.958,66.7 17.626,66.244C8.444,53.719 5.145,36.444 12.484,22.257" style={{fillRule:'nonzero'}} />
                              </g>
                              <g transform="matrix(1,0,0,1,4.92923,-4.51474)">
                                <path d="M31.852,20.416C25.824,29.09 26.151,40.702 30.853,49.876C31.642,51.414 32.528,52.906 33.519,54.327C34.423,55.621 35.424,57.161 36.622,58.201C37.057,58.68 37.511,59.146 37.975,59.605C38.092,59.725 38.212,59.839 38.331,59.957C38.782,60.394 39.24,60.823 39.713,61.241C39.733,61.255 39.75,61.275 39.769,61.29C39.774,61.295 39.779,61.297 39.783,61.302C40.306,61.761 40.847,62.203 41.397,62.638C41.519,62.73 41.639,62.828 41.763,62.923C42.313,63.346 42.875,63.761 43.451,64.156C43.468,64.169 43.483,64.181 43.5,64.193C43.754,64.369 44.013,64.532 44.27,64.701C44.393,64.781 44.511,64.867 44.635,64.942C45.046,65.206 45.463,65.462 45.886,65.709C45.946,65.745 46.005,65.777 46.063,65.811C46.428,66.021 46.798,66.229 47.169,66.429C47.299,66.502 47.43,66.566 47.562,66.634C47.819,66.768 48.075,66.905 48.336,67.034C48.375,67.054 48.416,67.071 48.453,67.088C48.984,67.349 49.52,67.601 50.067,67.84C50.184,67.892 50.305,67.938 50.424,67.987C50.861,68.172 51.303,68.353 51.747,68.524C51.935,68.595 52.125,68.663 52.313,68.731C52.716,68.88 53.12,69.017 53.528,69.154C53.712,69.212 53.893,69.273 54.077,69.329C54.657,69.51 55.229,69.737 55.834,69.837C86.957,74.993 94.142,51.031 94.142,51.031C87.665,60.36 75.122,64.81 61.737,61.336C61.142,61.18 60.556,61.009 59.974,60.826C59.796,60.772 59.621,60.714 59.444,60.655C59.03,60.521 58.619,60.379 58.211,60.23C58.025,60.162 57.838,60.094 57.655,60.023C57.208,59.852 56.766,59.674 56.328,59.488C56.208,59.437 56.087,59.391 55.97,59.337C55.421,59.098 54.88,58.846 54.347,58.582C54.072,58.448 53.802,58.307 53.532,58.167C53.376,58.087 53.219,58.006 53.062,57.926C52.716,57.738 52.372,57.542 52.032,57.345C51.952,57.298 51.867,57.254 51.786,57.205C51.364,56.959 50.949,56.705 50.538,56.444C50.411,56.363 50.289,56.275 50.162,56.192C49.891,56.016 49.62,55.838 49.354,55.658C48.78,55.262 48.222,54.847 47.672,54.427C47.545,54.327 47.418,54.229 47.293,54.129C41.434,49.503 36.79,43.182 34.582,36.014C32.268,28.58 32.767,20.235 36.776,13.463" style={{fillRule:'nonzero'}} />
                              </g>
                              <g transform="matrix(1,0,0,1,4.92923,-4.51474)">
                                <path d="M53.613,12.875C50.06,18.105 49.71,24.599 52.176,30.375C54.776,36.505 60.105,41.315 66.323,43.595C66.58,43.69 66.836,43.776 67.096,43.864C67.209,43.898 67.322,43.937 67.436,43.971C67.803,44.086 68.166,44.22 68.545,44.291C85.73,47.611 90.391,35.472 91.632,33.686C87.549,39.565 80.687,40.976 72.268,38.932C71.603,38.77 70.872,38.53 70.231,38.303C69.409,38.01 68.599,37.676 67.812,37.298C66.317,36.58 64.892,35.708 63.571,34.71C56.037,28.994 51.357,18.089 56.273,9.208" style={{fillRule:'nonzero'}} fill="currentColor" />
                              </g>
                            </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Apache">
                            <a href="https://httpd.apache.org/">
                              <svg width="50px" viewBox="0 0 220 400" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }} >
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1554.04,239.571C1501.92,270.34 1415.19,357.456 1312.12,483.802L1406.92,663.033C1473.65,567.84 1541.35,481.879 1609.62,408.61C1615,402.84 1617.5,400.148 1617.5,400.148C1615,402.84 1612.12,405.917 1609.62,408.61C1587.5,432.84 1520.38,511.302 1419.23,666.687C1516.73,661.879 1666.35,641.879 1788.46,621.11C1825,417.456 1752.88,324.379 1752.88,324.379C1752.88,324.379 1661.35,176.302 1554.04,239.571Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1126.92,1126.3C1155.77,1072.26 1185,1019.57 1214.42,968.417C1245,914.956 1276.15,863.417 1307.5,813.417C1309.23,810.533 1311.35,807.456 1313.08,804.571C1344.04,755.533 1375.38,708.225 1406.73,663.225L1311.92,483.994C1304.81,492.648 1297.69,501.494 1290.38,510.725C1262.88,544.956 1234.62,581.494 1205.38,620.533C1172.5,664.379 1138.85,711.302 1104.42,760.533C1072.88,805.917 1040.58,853.417 1008.27,902.84C980.769,944.763 953.462,987.84 926.154,1032.07C925.192,1033.61 924.231,1035.34 923.269,1037.07L1046.92,1281.3C1073.08,1228.42 1100,1176.69 1126.92,1126.3Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M563.846,2501.69C547.5,2546.49 530.962,2592.46 514.615,2639.19C514.423,2639.76 514.231,2640.53 513.846,2641.11C511.538,2647.65 509.038,2654.38 506.923,2660.92C495.769,2692.46 486.154,2720.92 464.038,2785.34C500.385,2801.88 529.615,2845.72 557.308,2895.34C554.423,2843.99 533.269,2795.72 492.692,2758.42C672.115,2766.49 826.731,2721.11 906.731,2589.96C913.846,2578.22 920.385,2566.11 926.346,2552.84C890,2598.99 844.808,2618.42 760,2613.8C759.808,2613.8 759.615,2613.99 759.423,2613.99C759.615,2613.99 759.808,2613.8 760,2613.8C885,2557.84 947.5,2504.19 1003.08,2415.34C1016.15,2394.19 1029.04,2371.3 1042.12,2345.72C932.885,2457.84 806.538,2489.76 673.269,2465.53L573.269,2476.49C570,2484.96 567.115,2493.22 563.846,2501.69Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M610.577,2278.03C632.115,2222.26 654.423,2165.72 677.115,2108.8C699.038,2054.19 721.346,1999.19 744.423,1944.19C767.5,1889.19 790.962,1833.61 814.808,1778.23C839.038,1721.88 864.038,1665.73 889.615,1609.76C914.808,1554.38 940.192,1499.38 966.154,1445.15C975.385,1425.53 985,1405.92 994.423,1386.49C1010.77,1352.84 1027.31,1319.38 1044.04,1286.3C1045,1284.57 1045.77,1282.65 1046.73,1280.92L923.077,1036.69C921.154,1039.96 919.038,1043.42 916.923,1046.49C888.077,1093.61 859.423,1141.69 831.346,1190.73C802.885,1240.34 775,1290.92 747.692,1342.26C724.808,1385.53 702.308,1428.99 680.192,1473.23C675.769,1482.07 671.538,1491.11 667.115,1499.96C640.192,1555.53 615.962,1608.8 593.846,1660.53C568.846,1718.8 546.923,1774.57 527.885,1827.46C515.192,1862.26 503.846,1895.73 493.269,1928.03C484.615,1955.53 476.538,1983.23 468.462,2010.73C450,2075.34 434.038,2139.96 420.962,2204.19L545.192,2449.38C561.538,2405.53 578.462,2360.92 595.769,2315.92C600.962,2303.03 605.577,2290.34 610.577,2278.03Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M419.615,2212.46C404.038,2290.92 392.885,2368.99 387.308,2446.69L386.731,2454.76C347.885,2392.65 244.231,2332.07 244.423,2332.65C318.846,2440.34 375.192,2547.26 383.462,2652.26C343.654,2660.34 289.231,2648.61 226.346,2625.53C291.923,2685.92 341.154,2702.46 360.577,2707.07C300.192,2710.92 237.5,2752.26 174.231,2799.96C266.731,2762.26 341.538,2747.26 395,2759.38C310,2999.76 225,3265.15 139.808,3547.07C165.962,3539.38 181.538,3521.69 190.192,3498.03C205.385,3447.07 305.962,3112.07 463.846,2672.26C468.462,2659.76 472.885,2647.07 477.5,2634.57C478.654,2630.92 480,2627.46 481.346,2624.19C497.885,2578.03 515.385,2530.92 533.077,2482.84C537.115,2471.88 541.154,2460.92 545.385,2449.96C545.385,2449.76 545.577,2449.57 545.577,2449.38L421.154,2204.19C420.769,2206.69 420.192,2209.57 419.615,2212.46Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1065.96,1301.3C1062.31,1308.61 1058.85,1315.92 1055.19,1323.23C1044.42,1345.34 1033.65,1367.84 1022.5,1390.92C1010.58,1415.92 998.654,1441.3 986.538,1467.46C980.385,1480.53 974.231,1493.8 968.077,1507.26C949.615,1547.46 930.962,1588.99 911.923,1631.88C888.654,1684.38 864.615,1739.19 840.577,1796.11C817.692,1850.34 794.038,1906.3 770.577,1964.38C748.077,2019.38 725.385,2076.3 702.308,2134.76C681.731,2186.88 660.962,2240.72 640.192,2295.92C639.231,2298.42 638.269,2301.3 637.308,2303.8C616.538,2358.61 595.577,2414.96 574.615,2472.65C574.231,2473.99 573.654,2475.15 573.269,2476.69L673.269,2465.72C671.346,2465.34 669.231,2465.15 667.308,2464.76C786.731,2449.96 945.769,2360.53 1048.27,2250.34C1095.58,2199.57 1138.46,2139.57 1178.08,2069.38C1207.5,2017.26 1235.38,1959.19 1261.92,1895.15C1285,1839.19 1307.12,1778.42 1328.46,1712.84C1300.96,1727.26 1269.62,1738.03 1235,1745.34C1228.85,1746.69 1222.69,1747.84 1216.35,1748.99C1210,1750.15 1203.65,1751.11 1197.12,1751.88C1197.12,1751.88 1197.31,1751.88 1197.31,1751.69C1308.85,1708.8 1379.04,1626.11 1430,1524.76C1400.77,1544.76 1353.08,1570.92 1295.96,1583.42C1288.27,1585.15 1280.38,1586.49 1272.31,1587.84C1270.38,1588.03 1268.27,1588.42 1266.35,1588.8L1266.73,1588.8C1305.58,1572.65 1338.08,1554.38 1366.35,1533.03C1372.5,1528.42 1378.46,1523.8 1383.85,1518.8C1392.5,1511.3 1400.58,1503.42 1408.65,1495.34C1413.65,1489.96 1418.46,1484.57 1423.27,1478.99C1434.42,1465.73 1444.81,1451.49 1454.42,1436.11C1457.31,1431.3 1460.38,1426.69 1463.08,1421.69C1466.92,1414.57 1470.38,1407.46 1473.85,1400.73C1489.42,1369.57 1501.92,1341.49 1511.73,1317.07C1516.73,1304.76 1520.96,1293.61 1524.81,1282.84C1526.35,1278.61 1527.69,1274.57 1529.04,1270.53C1533.08,1258.8 1536.15,1248.42 1538.65,1239.19C1542.5,1225.34 1544.81,1214.38 1545.96,1206.49C1542.12,1209.38 1537.88,1212.46 1532.88,1215.34C1499.23,1235.53 1441.54,1253.61 1395,1262.26L1486.73,1252.26L1395,1262.26C1394.42,1262.46 1393.65,1262.46 1392.88,1262.65C1388.08,1263.42 1383.65,1264.19 1378.85,1264.76L1381.15,1263.61L1067.12,1298.03C1067.12,1298.8 1066.54,1300.15 1065.96,1301.3Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1419.42,666.687C1391.54,709.571 1361.15,758.225 1328.08,813.417C1326.35,816.11 1324.42,819.379 1322.88,822.071C1294.62,869.763 1264.62,922.071 1232.69,979.571C1205.38,1029.19 1176.92,1082.26 1147.31,1139.38C1121.54,1189.19 1095,1242.07 1067.5,1298.03L1381.54,1263.61C1473.08,1221.49 1513.85,1183.61 1553.46,1128.42C1563.85,1113.23 1574.62,1097.46 1585,1080.92C1617.31,1030.53 1648.85,975.148 1677.12,919.956C1704.42,866.687 1728.46,813.994 1746.92,766.302C1758.65,736.11 1768.08,708.033 1774.62,683.225C1780.38,661.494 1784.81,640.725 1788.27,620.917C1666.54,641.879 1516.73,661.879 1419.42,666.687Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1216.35,1748.61C1210,1749.76 1203.65,1750.73 1197.12,1751.49C1203.65,1750.92 1210.19,1749.76 1216.35,1748.61Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1266.54,1588.61C1268.46,1588.42 1270.58,1588.03 1272.5,1587.65C1270.58,1587.84 1268.65,1588.42 1266.54,1588.61Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1266.54,1588.61C1266.73,1588.61 1266.73,1588.42 1266.54,1588.61C1266.73,1588.42 1266.73,1588.61 1266.54,1588.61Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1554.04,239.571C1501.92,270.34 1415.19,357.456 1312.12,483.802L1406.92,663.033C1473.65,567.84 1541.35,481.879 1609.62,408.61C1615,402.84 1617.5,400.148 1617.5,400.148C1615,402.84 1612.12,405.917 1609.62,408.61C1587.5,432.84 1520.38,511.302 1419.23,666.687C1516.73,661.879 1666.35,641.879 1788.46,621.11C1825,417.456 1752.88,324.379 1752.88,324.379C1752.88,324.379 1661.35,176.302 1554.04,239.571Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1126.92,1126.3C1155.77,1072.26 1185,1019.57 1214.42,968.417C1245,914.956 1276.15,863.417 1307.5,813.417C1309.23,810.533 1311.35,807.456 1313.08,804.571C1344.04,755.533 1375.38,708.225 1406.73,663.225L1311.92,483.994C1304.81,492.648 1297.69,501.494 1290.38,510.725C1262.88,544.956 1234.62,581.494 1205.38,620.533C1172.5,664.379 1138.85,711.302 1104.42,760.533C1072.88,805.917 1040.58,853.417 1008.27,902.84C980.769,944.763 953.462,987.84 926.154,1032.07C925.192,1033.61 924.231,1035.34 923.269,1037.07L1046.92,1281.3C1073.08,1228.42 1100,1176.69 1126.92,1126.3Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M563.846,2501.69C547.5,2546.49 530.962,2592.46 514.615,2639.19C514.423,2639.76 514.231,2640.53 513.846,2641.11C511.538,2647.65 509.038,2654.38 506.923,2660.92C495.769,2692.46 486.154,2720.92 464.038,2785.34C500.385,2801.88 529.615,2845.72 557.308,2895.34C554.423,2843.99 533.269,2795.72 492.692,2758.42C672.115,2766.49 826.731,2721.11 906.731,2589.96C913.846,2578.22 920.385,2566.11 926.346,2552.84C890,2598.99 844.808,2618.42 760,2613.8C759.808,2613.8 759.615,2613.99 759.423,2613.99C759.615,2613.99 759.808,2613.8 760,2613.8C885,2557.84 947.5,2504.19 1003.08,2415.34C1016.15,2394.19 1029.04,2371.3 1042.12,2345.72C932.885,2457.84 806.538,2489.76 673.269,2465.53L573.269,2476.49C570,2484.96 567.115,2493.22 563.846,2501.69Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M610.577,2278.03C632.115,2222.26 654.423,2165.72 677.115,2108.8C699.038,2054.19 721.346,1999.19 744.423,1944.19C767.5,1889.19 790.962,1833.61 814.808,1778.23C839.038,1721.88 864.038,1665.73 889.615,1609.76C914.808,1554.38 940.192,1499.38 966.154,1445.15C975.385,1425.53 985,1405.92 994.423,1386.49C1010.77,1352.84 1027.31,1319.38 1044.04,1286.3C1045,1284.57 1045.77,1282.65 1046.73,1280.92L923.077,1036.69C921.154,1039.96 919.038,1043.42 916.923,1046.49C888.077,1093.61 859.423,1141.69 831.346,1190.73C802.885,1240.34 775,1290.92 747.692,1342.26C724.808,1385.53 702.308,1428.99 680.192,1473.23C675.769,1482.07 671.538,1491.11 667.115,1499.96C640.192,1555.53 615.962,1608.8 593.846,1660.53C568.846,1718.8 546.923,1774.57 527.885,1827.46C515.192,1862.26 503.846,1895.73 493.269,1928.03C484.615,1955.53 476.538,1983.23 468.462,2010.73C450,2075.34 434.038,2139.96 420.962,2204.19L545.192,2449.38C561.538,2405.53 578.462,2360.92 595.769,2315.92C600.962,2303.03 605.577,2290.34 610.577,2278.03Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M419.615,2212.46C404.038,2290.92 392.885,2368.99 387.308,2446.69L386.731,2454.76C347.885,2392.65 244.231,2332.07 244.423,2332.65C318.846,2440.34 375.192,2547.26 383.462,2652.26C343.654,2660.34 289.231,2648.61 226.346,2625.53C291.923,2685.92 341.154,2702.46 360.577,2707.07C300.192,2710.92 237.5,2752.26 174.231,2799.96C266.731,2762.26 341.538,2747.26 395,2759.38C310,2999.76 225,3265.15 139.808,3547.07C165.962,3539.38 181.538,3521.69 190.192,3498.03C205.385,3447.07 305.962,3112.07 463.846,2672.26C468.462,2659.76 472.885,2647.07 477.5,2634.57C478.654,2630.92 480,2627.46 481.346,2624.19C497.885,2578.03 515.385,2530.92 533.077,2482.84C537.115,2471.88 541.154,2460.92 545.385,2449.96C545.385,2449.76 545.577,2449.57 545.577,2449.38L421.154,2204.19C420.769,2206.69 420.192,2209.57 419.615,2212.46Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1065.96,1301.3C1062.31,1308.61 1058.85,1315.92 1055.19,1323.23C1044.42,1345.34 1033.65,1367.84 1022.5,1390.92C1010.58,1415.92 998.654,1441.3 986.538,1467.46C980.385,1480.53 974.231,1493.8 968.077,1507.26C949.615,1547.46 930.962,1588.99 911.923,1631.88C888.654,1684.38 864.615,1739.19 840.577,1796.11C817.692,1850.34 794.038,1906.3 770.577,1964.38C748.077,2019.38 725.385,2076.3 702.308,2134.76C681.731,2186.88 660.962,2240.72 640.192,2295.92C639.231,2298.42 638.269,2301.3 637.308,2303.8C616.538,2358.61 595.577,2414.96 574.615,2472.65C574.231,2473.99 573.654,2475.15 573.269,2476.69L673.269,2465.72C671.346,2465.34 669.231,2465.15 667.308,2464.76C786.731,2449.96 945.769,2360.53 1048.27,2250.34C1095.58,2199.57 1138.46,2139.57 1178.08,2069.38C1207.5,2017.26 1235.38,1959.19 1261.92,1895.15C1285,1839.19 1307.12,1778.42 1328.46,1712.84C1300.96,1727.26 1269.62,1738.03 1235,1745.34C1228.85,1746.69 1222.69,1747.84 1216.35,1748.99C1210,1750.15 1203.65,1751.11 1197.12,1751.88C1197.12,1751.88 1197.31,1751.88 1197.31,1751.69C1308.85,1708.8 1379.04,1626.11 1430,1524.76C1400.77,1544.76 1353.08,1570.92 1295.96,1583.42C1288.27,1585.15 1280.38,1586.49 1272.31,1587.84C1270.38,1588.03 1268.27,1588.42 1266.35,1588.8L1266.73,1588.8C1305.58,1572.65 1338.08,1554.38 1366.35,1533.03C1372.5,1528.42 1378.46,1523.8 1383.85,1518.8C1392.5,1511.3 1400.58,1503.42 1408.65,1495.34C1413.65,1489.96 1418.46,1484.57 1423.27,1478.99C1434.42,1465.73 1444.81,1451.49 1454.42,1436.11C1457.31,1431.3 1460.38,1426.69 1463.08,1421.69C1466.92,1414.57 1470.38,1407.46 1473.85,1400.73C1489.42,1369.57 1501.92,1341.49 1511.73,1317.07C1516.73,1304.76 1520.96,1293.61 1524.81,1282.84C1526.35,1278.61 1527.69,1274.57 1529.04,1270.53C1533.08,1258.8 1536.15,1248.42 1538.65,1239.19C1542.5,1225.34 1544.81,1214.38 1545.96,1206.49C1542.12,1209.38 1537.88,1212.46 1532.88,1215.34C1499.23,1235.53 1441.54,1253.61 1395,1262.26L1486.73,1252.26L1395,1262.26C1394.42,1262.46 1393.65,1262.46 1392.88,1262.65C1388.08,1263.42 1383.65,1264.19 1378.85,1264.76L1381.15,1263.61L1067.12,1298.03C1067.12,1298.8 1066.54,1300.15 1065.96,1301.3Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1419.42,666.687C1391.54,709.571 1361.15,758.225 1328.08,813.417C1326.35,816.11 1324.42,819.379 1322.88,822.071C1294.62,869.763 1264.62,922.071 1232.69,979.571C1205.38,1029.19 1176.92,1082.26 1147.31,1139.38C1121.54,1189.19 1095,1242.07 1067.5,1298.03L1381.54,1263.61C1473.08,1221.49 1513.85,1183.61 1553.46,1128.42C1563.85,1113.23 1574.62,1097.46 1585,1080.92C1617.31,1030.53 1648.85,975.148 1677.12,919.956C1704.42,866.687 1728.46,813.994 1746.92,766.302C1758.65,736.11 1768.08,708.033 1774.62,683.225C1780.38,661.494 1784.81,640.725 1788.27,620.917C1666.54,641.879 1516.73,661.879 1419.42,666.687Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1216.35,1748.61C1210,1749.76 1203.65,1750.73 1197.12,1751.49C1203.65,1750.92 1210.19,1749.76 1216.35,1748.61Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                                <g transform="matrix(0.10592,0,0,0.10592,11.0993,0.339045)">
                                  <path d="M1266.54,1588.61C1266.73,1588.61 1266.73,1588.42 1266.54,1588.61C1266.73,1588.42 1266.73,1588.61 1266.54,1588.61Z" style={{ fillRule: 'nonzero' }} />
                                </g>
                              </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Gulp">
                            <a href="https://gulpjs.com/">
                              <FontAwesomeIcon icon={['fab', 'gulp']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="Bootstrap">
                            <a href="https://getbootstrap.com/">
                              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 118 94" role="img">
                                <path fillRule="evenodd" clipRule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path>
                              </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Node Package Manager">
                            <a href="https://www.npmjs.com/">
                              <FontAwesomeIcon icon={['fab', 'npm']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="MySQL">
                            <a href="https://www.mysql.com/">
                              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 388.12 264.29" width="64" height="40" preserveAspectRatio="xMinYMin meet">
                              <g display="inline" transform="matrix(1.8189257,0,0,1.8237746,-82.14211,-64.843651)">
                                <g transform="matrix(1.2699241,0,0,-1.2699241,3.3662307,208.12494)">
                                  <g transform="scale(0.1,0.1)">
                                    <path fillRule="nonzero" fill="currentColor" d="m733.07,319.32-64.832,0c-2.28,109.43-8.6,212.33-18.93,308.72h-0.57104l-98.711-308.72h-49.363l-98.113,308.72h-0.578c-7.28-92.57-11.86-195.47-13.77-308.72h-59.113c3.82,137.73,13.38,266.84,28.68,387.36h80.356l93.535-284.62h0.57397l94.109,284.62h76.887c16.836-141.15,26.778-270.3,29.832-387.36" />
                                    <path fillRule="nonzero" fill="currentColor" d="m1014.3,605.11c-26.401-143.25-61.225-247.35-104.45-312.29-33.679-50.039-70.574-75.058-110.75-75.058-10.71,0-23.917,3.226-39.589,9.636v34.532c7.656-1.121,16.64-1.719,26.972-1.719,18.743,0,33.848,5.18,45.34,15.519,13.762,12.598,20.649,26.758,20.649,42.45,0,10.718-5.372,32.711-16.067,65.98l-71.152,220.95h63.691l51.067-165.25c11.472-37.519,16.257-63.711,14.343-78.64,27.93,74.601,47.442,155.9,58.543,243.89h61.401" />
                                    <path fillRule="nonzero" fill="currentColor" d="m1298.3,426.69c0-32.851-12.07-59.82-36.13-80.921-24.08-21.008-56.43-31.54-96.94-31.54-37.89,0-74.61,12.122-110.18,36.168l16.64,33.274c30.61-15.301,58.31-22.942,83.18-22.942,23.33,0,41.59,5.192,54.8,15.45,13.18,10.332,21.08,24.742,21.08,43.019,0,23-16.04,42.66-45.47,59.153-27.17,14.91-81.47,46.039-81.47,46.039-29.42,21.461-44.17,44.488-44.17,82.429,0,31.379,11,56.742,32.97,76.039,22.02,19.336,50.43,29.004,85.22,29.004,35.96,0,68.66-9.597,98.11-28.722l-14.96-33.243c-25.2,10.684-50.05,16.047-74.55,16.047-19.88,0-35.2-4.773-45.88-14.375-10.74-9.519-17.38-21.769-17.38-36.699,0-22.941,16.39-42.84,46.65-59.652,27.51-14.918,83.14-46.649,83.14-46.649,30.26-21.422,45.34-44.261,45.34-81.879" />
                                    <path fillRule="evenodd" fill="currentColor" d="m1414.2,396.81c-15.69,25.25-23.55,65.769-23.55,121.64,0,97.539,29.66,146.34,88.95,146.34,31,0,53.75-11.672,68.3-34.992,15.67-25.262,23.53-65.43,23.53-120.52,0-98.32-29.66-147.5-88.95-147.5-30.99,0-53.75,11.66-68.28,35.028m230.68-86.829-71.2,35.11c6.3401,5.199,12.36,10.808,17.81,17.301,30.23,35.539,45.36,88.14,45.36,157.78,0,128.15-50.31,192.26-150.92,192.26-49.35,0-87.81-16.25-115.35-48.797-30.24-35.582-45.34-87.985-45.34-157.23,0-68.089,13.38-118.04,40.16-149.77,24.4-28.68,61.3-43.04,110.7-43.04,18.43,0,35.34,2.269,50.71,6.808l92.72-53.957,25.28,43.539" />
                                    <path fillRule="nonzero" fill="currentColor" d="m1877.3,319.32-184.19,0,0,387.36,61.98,0,0-339.71,122.21,0,0-47.649" />
                                    <path fillRule="nonzero" fill="currentColor" d="m1921.5,319.36,10.27,0,0,39.411,13.44,0,0,8.05-37.67,0,0-8.05,13.96,0,0-39.411zm78.15,0,9.6801,0,0,47.461-14.56,0-11.85-32.351-12.9,32.351-14.03,0,0-47.461,9.1599,0,0,36.121,0.5201,0,13.51-36.121,6.9799,0,13.49,36.121,0-36.121" />
                                    <path fillRule="evenodd" fill="currentColor" d="m1955.1,836.43c-37.46,0.93695-66.47-2.801-90.8-13.106-7.02-2.805-18.24-2.805-19.2-11.699,3.77-3.738,4.2201-9.817,7.52-14.988,5.6-9.36,15.41-21.977,24.32-28.547,9.8299-7.492,19.66-14.953,29.97-21.504,18.24-11.281,38.84-17.805,56.6-29.043,10.33-6.543,20.59-14.961,30.92-22,5.13-3.742,8.38-9.836,14.96-12.152v1.417c-3.3001,4.2-4.22,10.286-7.48,14.993-4.67,4.644-9.36,8.883-14.05,13.543-13.58,18.25-30.45,34.148-48.66,47.254-14.99,10.324-47.77,24.367-53.83,41.632,0,0-0.49,0.49597-0.95,0.95697,10.3,0.95001,22.49,4.7,32.31,7.539,15.89,4.2,30.4,3.25,46.78,7.45,7.5,1.886,14.99,4.242,22.51,6.543v4.242c-8.47,8.4059-14.53,19.656-23.42,27.605-23.85,20.586-50.09,40.696-77.23,57.571-14.53,9.363-33.25,15.418-48.7,23.394-5.5899,2.813-14.94,4.199-18.23,8.906-8.4301,10.293-13.13,23.848-19.2,36.036-13.56,25.713-26.69,54.253-38.37,81.443-8.4199,18.24-13.57,36.48-23.87,53.34-48.23,79.58-100.63,127.76-181.13,175.04-17.32,9.84-37.91,14.05-59.89,19.2-11.72,0.49-23.41,1.4-35.11,1.86-7.5,3.29-15,12.19-21.54,16.4-26.69,16.84-95.46,53.34-115.13,5.14-12.64-30.44,18.72-60.38,29.49-75.83,7.9499-10.75,18.26-22.94,23.85-35.09,3.2801-7.96,4.22-16.4,7.51-24.81,7.48-20.59,14.49-43.53,24.34-62.73,5.13-9.8299,10.74-20.14,17.29-28.99,3.7799-5.1799,10.31-7.49,11.72-15.94-6.53-9.35-7.04-23.39-10.78-35.1-16.84-52.89-10.3-118.41,13.58-157.25,7.47-11.699,25.28-37.449,49.15-27.597,21.06,8.4098,16.38,35.089,22.46,58.476,1.3999,5.6562,0.4599,9.3668,3.26,13.106v-0.94592c6.5499-13.086,13.12-25.691,19.2-38.84,14.53-22.91,39.78-46.785,60.86-62.683,11.2-8.457,20.1-22.942,34.14-28.106v1.414h-0.92c-2.82,4.1998-7.0199,6.086-10.77,9.3478-8.4201,8.4299-17.76,18.731-24.34,28.086-19.65,26.199-36.99,55.234-52.4,85.184-7.5099,14.543-14.05,30.441-20.14,44.941-2.8001,5.5901-2.8001,14.039-7.4901,16.84-7.0399-10.285-17.31-19.191-22.45-31.789-8.9-20.149-9.8299-44.949-13.13-70.703-1.86-0.48895-0.92,0-1.86-0.92999-14.96,3.7419-20.11,19.184-25.74,32.246-14.04,33.274-16.4,86.627-4.2099,125.01,3.26,9.8101,17.34,40.7,11.7,50.06-2.8299,8.9299-12.18,14.03-17.32,21.08-6.0701,8.89-12.66,20.1-16.83,29.95-11.24,26.2-16.89,55.23-29.02,81.43-5.62,12.19-15.47,24.83-23.4,36.04-8.91,12.64-18.73,21.53-25.76,36.49-2.3201,5.16-5.6001,13.59-1.87,19.19,0.9199,3.75,2.8199,5.1601,6.5699,6.1001,6.0501,5.1499,23.39-1.39,29.46-4.2,17.33-7,31.84-13.59,46.33-23.4,6.5599-4.6899,13.58-13.58,21.99-15.94h9.8499c14.97-3.25,31.83-0.91,45.88-5.14,24.79-7.95,47.25-19.65,67.39-32.29,61.29-38.85,111.84-94.09,145.99-160.07,5.63-10.75,7.99-20.59,13.13-31.8,9.83-22.98,22.01-46.38,31.82-68.823,9.8201-22,19.2-44.446,33.26-62.727,7-9.812,35.09-14.961,47.73-20.113,9.3401-4.199,23.87-7.949,32.3-13.09,15.91-9.812,31.79-21.062,46.79-31.844,7.4699-5.617,30.88-17.304,32.29-26.679" />
                                    <path fillRule="evenodd" fill="currentColor" d="m1477.7,1243.2c-7.9399,0-13.54-0.96-19.19-2.3501v-0.9399h0.91c3.7799-7.47,10.34-12.66,14.98-19.2,3.77-7.4902,7.0499-14.95,10.79-22.45,0.4599,0.4599,0.9099,0.9501,0.9099,0.9501,6.5999,4.6599,9.87,12.14,9.87,23.39-2.83,3.3001-3.2701,6.5501-5.63,9.8401-2.8,4.6699-8.89,7.01-12.64,10.76" />
                                  </g>
                                </g>
                              </g>
                            </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Google Analytics">
                            <a href="https://analytics.google.com/analytics/web/">
                              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 192 192" enableBackground="new 0 0 192 192">
                              <rect x="0" y="0" fill="none" width="192" height="192" />
                                <g>
                                  <g>
                                    <path fill="currentColor" d="M130,29v132c0,14.77,10.19,23,21,23c10,0,21-7,21-23V30c0-13.54-10-22-21-22S130,17.33,130,29z" />
                                  </g>
                                  <g>
                                    <path className="darkGrey" fill="currentColor" d="M75,96v65c0,14.77,10.19,23,21,23c10,0,21-7,21-23V97c0-13.54-10-22-21-22S75,84.33,75,96z" />
                                  </g>
                                  <g>
                                    <circle className="darkGrey" fill="currentColor" cx="41" cy="163" r="21" />
                                  </g>
                                </g>
                            </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Localist">
                            <a href="https://www.localist.com/">
                              <svg width="82" viewBox="0 0 122 59" xmlns="http://www.w3.org/2000/svg">
                              <g fill="none" fillRule="evenodd">
                                <path d="M118.066 46.775c.19 1.122-.734 2.12-2.067 2.231a3516.568 3516.568 0 0 0-98.888 9.628c-1.357.153-2.433-.934-2.4-2.426.21-9.632.44-19.273.69-28.923.04-1.495 1.12-2.743 2.41-2.784a3143.268 3143.268 0 0 1 94.016-1.72c1.264-.002 2.44.922 2.623 2.062 1.185 7.368 2.39 14.68 3.616 21.932" fill="#333745" />
                                <path className="altGrey2" d="M104.402 28.652c-.02 1.161-1.14 2.114-2.493 2.124-17.411.103-34.71-.046-51.895-.444-1.338-.028-2.289-1.253-2.124-2.73.936-8.456 1.85-16.84 2.741-25.16.158-1.455 1.31-2.481 2.576-2.298a1639.25 1639.25 0 0 0 49.214 6.244c1.282.146 2.314 1.194 2.3 2.344-.084 6.61-.19 13.25-.319 19.92" fill="currentColor" />
                                <path d="M121.348 42.834c.116 1.123-.889 2.088-2.243 2.155L2.472 50.618c-1.354.067-2.358-1.099-2.243-2.603C1.27 34.32 2.313 20.67 3.355 7.065 3.469 5.57 4.595 4.41 5.87 4.474l109.838 5.3c1.273.064 2.4 1.034 2.515 2.167 1.041 10.343 2.083 20.64 3.125 30.893" fill="currentColor" />
                                <path fill="#FFF" d="M21.089 39.438h4.265V15.331H21.09zM33.496 35.74c-1.928 0-2.086-1.263-2.086-5.117 0-3.885.158-5.15 2.086-5.15 1.864 0 2.023 1.265 2.023 5.15 0 3.854-.16 5.118-2.023 5.118m0-14.407c-2.211 0-3.665.664-4.613 1.643-1.58 1.61-1.768 4.203-1.768 7.488 0 3.382.22 6.034 1.894 7.614.949.917 2.338 1.517 4.487 1.517 2.15 0 3.57-.633 4.486-1.58 1.643-1.58 1.864-4.202 1.864-7.55 0-3.256-.19-5.846-1.705-7.458-.949-.98-2.4-1.674-4.645-1.674M74.185 19.913h4.265V15.71h-4.265zM71.002 34.226V15.33h-4.265v19.43c0 3.698 1.14 4.74 4.835 4.74.16 0 .76-.03.852-.063v-3.79H72.3c-1.2 0-1.297-.221-1.297-1.422M85.655 39.438c4.045 0 5.467-2.147 5.467-4.802 0-2.59-1.106-3.572-3.887-5.753-1.99-1.546-2.307-1.864-2.307-2.557 0-.696.532-.98 1.605-.98h6.72v8.94c0 3.823 1.011 5.183 5.277 5.183.663 0 1.39 0 1.958-.063v-3.919h-1.357c-1.456 0-1.612-.472-1.612-1.58v-8.561h2.97v-3.823h-2.97v-4.486l-3.444.852-.631 3.634h-6.911c-4.045 0-5.649 1.99-5.649 4.803 0 2.336.79 3.412 3.823 5.75 2.15 1.642 2.338 1.675 2.338 2.464 0 .758-.569 1.075-1.39 1.075H80.21v3.823h5.445zM48.268 25.346h3.224v-3.823h-3.825c-1.864 0-3.19.505-4.139 1.327-1.627 1.475-1.909 4.12-1.924 7.49H41.6l.002.14-.002.142h.003c.015 3.37.297 6.014 1.924 7.489.949.822 2.275 1.327 4.14 1.327h3.824v-3.823h-3.224c-1.862 0-2.273-.82-2.275-5.134.002-4.315.413-5.135 2.275-5.135M60.408 33.372c0 1.58-.221 2.622-1.99 2.622-1.358 0-1.517-.821-1.517-2.56 0-2.242.759-2.685 3.507-2.685v2.623zm2.73-10.49c-.785-.875-2.383-1.313-4.34-1.351v-.008h-5.18v3.823h5.18c1.295 0 1.579.633 1.61 2.022h-.284c-5.213 0-7.33 1.392-7.33 6.446 0 3.885 1.169 5.782 4.739 5.782 2.18 0 3.191-.537 3.949-1.326v1.168h3.128V26.705c0-1.896-.714-3.001-1.473-3.822zM74.185 39.438h4.265V21.555h-4.265z" />
                              </g>
                            </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Heroku">
                            <a href="https://www.heroku.com/">
                              <svg version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="60 -8 143 40"
                                xmlSpace="preserve">
                      
                                <g id="main" transform="translate(-25.000000, -23.000000)">
                                  <g id="nav" transform="translate(25.000000, 23.000000)">
                                    <path id="logoHeroku" d="M92.3-8H63.6c-2,0-3.6,1.6-3.6,3.6v32.8c0,2,1.6,3.6,3.6,3.6h28.7
                                      c2,0,3.6-1.6,3.6-3.6V-4.4C95.9-6.4,94.3-8,92.3-8z M93.9,28.4c0,0.9-0.7,1.6-1.6,1.6H63.6c-0.9,0-1.6-0.7-1.6-1.6V-4.4
                                      C62-5.3,62.7-6,63.6-6h28.7c0.9,0,1.6,0.7,1.6,1.6V28.4z M69,26l4.5-4L69,18V26z M85.2,9.8C84.4,9,82.9,8,80.4,8
                                      c-2.7,0-5.5,0.7-7.5,1.4V-2h-4v17.3l2.8-1.3c0,0,4.6-2.1,8.6-2.1c2,0,2.5,1.1,2.5,2.1V26h4V14C86.9,13.7,86.9,11.5,85.2,9.8z
                                      M79.9,4.5h4c1.8-2.1,2.7-4.2,3-6.5h-4C82.5,0.3,81.5,2.4,79.9,4.5z M190.4,13.9V5.1h4v8.8c0,2,0.7,3,2.3,3c1.6,0,2.2-0.9,2.2-3
                                      V5.1h3.9v8.9c0,3.9-1.9,6.2-6.2,6.2C192.3,20.1,190.4,17.8,190.4,13.9z M173.6,5.1h4v5.4l4.1-5.4h4.6l-5,5.8l5.4,9h-4.5l-3.5-5.9
                                      l-1.1,1.3v4.6h-4V5.1z M154.6,12.4c0-5.4,3.7-7.7,7.3-7.7c3.6,0,7.3,2.3,7.3,7.7c0,5.4-3.7,7.7-7.3,7.7
                                      C158.3,20.1,154.6,17.9,154.6,12.4z M165.1,12.4c0-2.7-1.2-4.4-3.3-4.4c-2.1,0-3.3,1.7-3.3,4.4c0,2.7,1.2,4.5,3.3,4.5
                                      C163.9,16.9,165.1,15.2,165.1,12.4z M138.5,5.1h5.8c3.8,0,6.1,1.3,6.1,4.8c0,2.3-1,3.7-2.9,4.3l3.1,5.7h-4.2l-2.9-5.1h-1.1v5.1
                                      h-3.9V5.1z M144.2,11.7c1.6,0,2.4-0.5,2.4-1.7c0-1.2-0.7-1.7-2.4-1.7h-1.7v3.4H144.2z M123.2,5.1h10.6v3.3h-6.6v2.4h4.7v3.1h-4.7
                                      v2.7h6.9v3.2h-10.9V5.1z M105.1,5.1h4v5.5h4.9V5.1h4v14.8h-4v-6h-4.9v6h-4V5.1z"/>
                                  </g>
                                </g>

                              </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="TinyMCE">
                            <a href="https://www.tiny.cloud/">
                              <svg width="64px" viewBox="0 0 586 198" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Group" fill="currentColor">
                                      <path d="M87.8,61.19 L131.7,61.19 L131.7,71 L87.8,71 L87.8,61.19 Z M87.8,119.81 L131.7,119.81 L131.7,129.58 L87.8,129.58 L87.8,119.81 Z M73.17,100.27 L146.33,100.27 L146.33,110 L73.17,110 L73.17,100.27 Z M73.17,80.73 L146.33,80.73 L146.33,90.5 L73.17,90.5 L73.17,80.73 Z M29.27,93 L109.78,171.15 L190.23,92.99 L109.78,14.79 L29.27,93 Z M109.42,0.13 L197.55,85 L210.32,73.09 L219.5,81.4 L109.75,188.2 L20.45,101.51 L8.63,112.92 L0,104.55 L109.42,0.13 Z" id="Shape"></path>
                                      <path d="M522.46,154.46 L476.8,46.92 L492.67,46.92 L530,135.55 L569.86,46.92 L585.72,46.92 L517.74,197.15 L502.09,197.15 L522.46,154.46 Z M365.72,46.92 L380.72,46.92 L380.72,61.15 L381.15,61.15 C382.567297,59.1943331 384.142575,57.3581803 385.86,55.66 C388.090801,53.4560301 390.618564,51.5745129 393.37,50.07 C396.658805,48.2543512 400.144891,46.821667 403.76,45.8 C408.12209,44.5911158 412.633913,44.0086193 417.16,44.07 C423.920084,44.0111177 430.646807,45.0236702 437.09,47.07 C443.526628,49.3058896 449.38254,52.951314 454.23,57.74 C458.889511,62.143315 462.513357,67.526144 464.84,73.5 C467.506667,79.9266667 468.84,87.7533333 468.84,96.98 L468.84,158.17 L453.84,158.17 L453.84,96.93 C453.84,89.5966667 452.803333,83.43 450.73,78.43 C448.984566,73.8870892 446.252135,69.7884434 442.73,66.43 C438.944972,62.8441457 434.346964,60.2294574 429.33,58.81 C421.465104,56.2369167 412.984896,56.2369167 405.12,58.81 C395.395787,61.5374187 387.529819,68.6953756 383.9,78.12 C381.69801,83.7862456 380.640975,89.8327563 380.79,95.91 L380.79,158.12 L365.79,158.12 L365.72,46.92 Z M322.85,46.92 L337.85,46.92 L337.85,158.12 L322.85,158.12 L322.85,46.92 Z M322.85,7.69 L337.85,7.69 L337.85,33.3 L322.85,33.3 L322.85,7.69 Z M263.92,59.69 L239.27,59.69 L239.27,46.92 L263.92,46.92 L263.92,7.69 L278.92,7.69 L278.92,46.92 L307,46.92 L307,59.73 L278.92,59.73 L278.92,158.12 L263.92,158.12 L263.92,59.69 Z" id="Shape"></path>
                                    </g>
                                  </g>
                              </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Bluepay/Clover">
                            <a href="https://www.clover.com/">
                              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 22 22" width="50px">
                                <g>
                                  <path fill="currentColor" d="M9.7,5.6c0-2-1.2-3.7-3-4.5s-3.9-0.4-5.3,1s-1.8,3.5-1.1,5.3s2.5,3,4.5,3h4.9L9.7,5.6z M11.1,5.6   c0-2,1.2-3.7,3-4.5s3.9-0.4,5.3,1s1.8,3.5,1.1,5.3s-2.5,3-4.5,3h-4.9L11.1,5.6z M11.1,16.6c0,2,1.2,3.7,3,4.5   c1.8,0.8,3.9,0.4,5.3-1c1.4-1.4,1.8-3.5,1.1-5.3s-2.5-3-4.5-3h-4.9L11.1,16.6z M4.8,20.1c1.9,0,3.5-1.5,3.5-3.5v-3.5H4.8   c-1.9,0-3.5,1.5-3.5,3.5S2.9,20.1,4.8,20.1z M9.7,16.6c0,2-1.2,3.7-3,4.5c-1.8,0.8-3.9,0.4-5.3-1c-1.4-1.4-1.8-3.5-1.1-5.3   s2.5-3,4.5-3h4.9L9.7,16.6z" />
                                </g>
                              </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="PostgreSQL">
                            <a href="https://www.postgresql.org/">
                              <svg width="100%" height="100%" viewBox="0 0 600 600" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" style={{fillRule:'evenodd',clipRule:'evenodd'}}>
                                <g transform="matrix(1,0,0,1,-300,-100)">
                                  <g transform="matrix(1,0,0,1,-8.4179,-4.83516)">
                                    <clipPath id="_clip1">
                                      <rect x="302.509" y="122.925" width="594.403" height="586.023" />
                                    </clipPath>
                                    <g clipPath="url(#_clip1)">
                                      <path d="M728.239,521.819C731.634,493.541 730.616,489.393 751.679,493.974L757.027,494.444C773.223,495.181 794.409,491.839 806.856,486.056C833.65,473.624 849.538,452.867 823.118,458.321C762.853,470.753 758.709,450.347 758.709,450.347C822.346,355.926 848.948,236.067 825.986,206.728C763.357,126.703 654.947,164.546 653.133,165.529L652.556,165.637C640.648,163.165 627.322,161.688 612.352,161.446C585.08,160.998 564.386,168.596 548.688,180.502C548.688,180.502 355.291,100.825 364.288,280.705C366.201,318.97 419.137,570.253 482.274,494.354C505.35,466.6 527.65,443.134 527.65,443.134C538.724,450.491 551.982,454.243 565.887,452.895L566.962,451.979C566.625,455.425 566.774,458.796 567.392,462.786C551.13,480.958 555.908,484.15 523.391,490.842C490.492,497.624 509.82,509.694 522.436,512.849C537.734,516.675 573.125,522.094 597.045,488.617L596.092,492.437C602.472,497.541 602.041,529.125 602.946,551.69C603.852,574.256 605.362,595.316 609.962,607.73C614.562,620.143 619.99,652.123 662.726,642.964C698.443,635.31 725.751,624.294 728.239,521.819" style={{fillRule:'nonzero',stroke:'currentColor',strokeWidth:'44.81px'}} />
                                    </g>
                                  </g>
                                  <g transform="matrix(1,0,0,1,-8.4179,-4.83516)">
                                    <path d="M823.124,458.318C762.853,470.751 758.709,450.344 758.709,450.344C822.346,355.917 848.948,236.057 825.991,206.721C763.362,126.7 654.947,164.545 653.138,165.527L652.556,165.632C640.648,163.16 627.322,161.687 612.344,161.443C585.072,160.996 564.386,168.592 548.688,180.496C548.688,180.496 355.287,100.823 364.282,280.701C366.195,318.969 419.13,570.252 482.269,494.353C505.346,466.599 527.643,443.132 527.643,443.132C538.718,450.489 551.976,454.242 565.875,452.894L566.955,451.977C566.619,455.423 566.772,458.795 567.387,462.785C551.122,480.957 555.901,484.149 523.386,490.841C490.485,497.622 509.813,509.693 522.432,512.848C537.731,516.674 573.124,522.093 597.039,488.616L596.085,492.436C602.458,497.54 606.933,525.639 606.183,551.111C605.433,576.582 604.932,594.07 609.954,607.729C614.976,621.388 619.98,652.122 662.725,642.963C698.441,635.309 716.95,615.474 719.525,582.388C721.352,558.868 725.487,562.344 725.748,541.314L729.065,531.359C732.889,499.475 729.672,489.187 751.677,493.972L757.025,494.441C773.22,495.178 794.418,491.836 806.858,486.054C833.648,473.622 849.536,452.864 823.121,458.318L823.124,458.318Z" style={{fill:'currentColor',fillRule:'nonzero'}} />
                                  </g>
                                  <g transform="matrix(1,0,0,1,-8.4179,-4.83516)">
                                    <path d="M599.627,476.595C597.967,535.925 600.044,595.668 605.849,610.188C611.658,624.707 624.089,652.949 666.837,643.791C702.55,636.134 715.544,621.318 721.183,588.614C725.336,564.551 733.342,497.726 734.369,484.034M548.39,179.171C548.39,179.171 354.857,100.072 363.854,279.951C365.768,318.218 418.706,569.509 481.844,493.606C504.916,465.849 525.782,444.079 525.782,444.079M652.926,164.734C646.227,166.835 760.581,122.931 825.569,205.972C848.525,235.309 821.923,355.171 758.287,449.6" style={{fill:'none',fillRule:'nonzero',stroke:'white',strokeWidth:'14.94px',strokeLinecap:'round',strokeLinejoin:'round'}} />
                                  </g>
                                  <g transform="matrix(1,0,0,1,-8.4179,-4.83516)">
                                    <path d="M758.286,449.599C758.286,449.599 762.433,470.011 822.706,457.571C849.114,452.116 833.221,472.876 806.438,485.315C784.457,495.516 735.177,498.131 734.372,484.034C732.3,447.663 760.309,458.712 758.287,449.599C756.46,441.391 743.934,433.336 735.649,413.248C728.415,395.715 636.444,261.259 761.155,281.228C765.723,280.283 728.629,162.605 611.917,160.692C495.231,158.778 499.059,304.189 499.059,304.189" style={{fill:'none',fillRule:'nonzero',stroke:'white',strokeWidth:'14.94px',strokeLinecap:'round',strokeLinejoin:'bevel'}} />
                                  </g>
                                  <g transform="matrix(1,0,0,1,-8.4179,-4.83516)">
                                    <path d="M566.962,462.037C550.694,480.209 555.478,483.401 522.961,490.095C490.06,496.877 509.39,508.947 522.006,512.1C537.304,515.928 572.697,521.348 596.612,487.862C603.895,477.667 596.569,461.399 586.565,457.252C581.732,455.251 575.269,452.741 566.962,462.037Z" style={{fill:'none',fillRule:'nonzero',stroke:'white',strokeWidth:'14.94px',strokeLinecap:'round',strokeLinejoin:'round'}} />
                                  </g>
                                  <g transform="matrix(1,0,0,1,-8.4179,-4.83516)">
                                    <path d="M565.897,461.721C564.257,451.036 569.407,438.322 574.926,423.447C583.22,401.13 602.356,378.809 587.048,308.015C575.638,255.26 499.106,297.036 499.058,304.189C499.011,311.34 502.519,340.446 497.779,374.341C491.594,418.57 525.923,455.976 565.452,452.149" style={{fill:'none',fillRule:'nonzero',stroke:'white',strokeWidth:'14.94px',strokeLinecap:'round',strokeLinejoin:'round'}} />
                                  </g>
                                  <g transform="matrix(1,0,0,1,-8.4179,-4.83516)">
                                    <path d="M547.686,303.117C547.341,305.561 552.159,312.079 558.441,312.95C564.713,313.825 570.081,308.73 570.421,306.29C570.761,303.846 565.949,301.155 559.665,300.281C553.39,299.406 548.02,300.68 547.688,303.117L547.686,303.117Z" style={{fill:'white',fillRule:'nonzero',stroke:'white',strokeWidth:'4.98px'}} />
                                  </g>
                                  <g transform="matrix(1,0,0,1,-8.4179,-4.83516)">
                                    <path d="M738.707,298.136C739.047,300.58 734.235,307.098 727.952,307.969C721.676,308.844 716.308,303.749 715.964,301.309C715.632,298.866 720.445,296.174 726.722,295.3C733,294.425 738.366,295.699 738.707,298.137L738.707,298.136Z" style={{fill:'white',fillRule:'nonzero',stroke:'white',strokeWidth:'2.49px'}} />
                                  </g>
                                  <g transform="matrix(1,0,0,1,-8.4179,-4.83516)">
                                    <path d="M761.155,281.228C762.189,300.392 757.027,313.445 756.376,333.846C755.413,363.498 770.514,397.438 747.76,431.42" style={{fill:'none',fillRule:'nonzero',stroke:'white',strokeWidth:'14.94px',strokeLinecap:'round',strokeLinejoin:'round'}} />
                                  </g>
                                </g>
                              </svg>
                            </a>
                          </div>

                          <div className="technologies__icon" title="Java">
                            <a href="https://www.oracle.com/java/technologies/">
                              <FontAwesomeIcon icon={['fab', 'java']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="Mailchimp">
                            <a href="https://mailchimp.com/">
                              <FontAwesomeIcon icon={['fab', 'mailchimp']} size="4x" />
                            </a>
                          </div>

                          <div className="technologies__icon" title="PHP">
                            <a href="https://www.php.net/">
                              <FontAwesomeIcon icon={['fab', 'php']} className="technologies__icon" size="4x"  />
                            </a>
                          </div>
                  
                      </div>

                  </div>

              </div>
          </div>
      );

    }

}

ReactDOM.render(<App />, document.getElementById('root'));
