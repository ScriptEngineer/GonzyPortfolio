import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAws, faCss3, faGit, faGithub, faHtml5, faJava, faJs,
  faNodeJs, faPython, faReact, faSass, faMailchimp,
} from '@fortawesome/free-brands-svg-icons';

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

// Register the brand icons used by the technologies grid on the Services page.
library.add(
  faAws, faCss3, faGit, faGithub, faHtml5, faJava, faJs,
  faNodeJs, faPython, faReact, faSass, faMailchimp,
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
