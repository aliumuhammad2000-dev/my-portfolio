import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Skills from './components/Skills.jsx';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" tabIndex={-1}><Hero /><About /><Services /><Skills /><Projects /></main>
    </>
  );
}
