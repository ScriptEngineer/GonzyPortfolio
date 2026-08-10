import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAws, faCss3, faGit, faGithub, faGulp, faHtml5, faJava, faJs,
  faNodeJs, faNpm, faPython, faReact, faSass, faMailchimp,
} from '@fortawesome/free-brands-svg-icons';

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import FrankensteinAudio from './pages/FrankensteinAudio';
import BrandGenie from './pages/BrandGenie';
import CustomAgents from './pages/CustomAgents';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

// Register the brand icons used by the technologies carousel on the home page.
library.add(
  faAws, faCss3, faGit, faGithub, faGulp, faHtml5, faJava, faJs,
  faNodeJs, faNpm, faPython, faReact, faSass, faMailchimp,
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/frankenstein-audio" element={<FrankensteinAudio />} />
          <Route path="/products/brandgenie" element={<BrandGenie />} />
          <Route path="/products/custom-ai-agents" element={<CustomAgents />} />
          <Route path="/products" element={<Navigate to="/products/custom-ai-agents" replace />} />
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
