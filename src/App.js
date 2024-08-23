import React, { useState , useEffect, useMemo} from 'react';
import './portfolio.css';

const App = () => {
  const content = useMemo(() =>({
    home:(
      <div>
      <h1>Welcome to my portfolio</h1>
      <p> This is the homepage content</p>
      </div>
    ),
    about:(
      <div>
        <h1> About Me </h1>
        <p> Hi there! I'm Edward Bao, a Junior at George Mason University majoring in Information Technology, with a passion for leveraging technology to solve complex problems. 
           I have a strong foundation in programming (Java, Python, R), web development (HTML/CSS, Bootstrap, React, Node.js, Django), and database management (MySQL).
           I'm also proficient in Microsoft Office, WordPress, Photoshop, Google Analytics, and Tag Manager. 
           Fluent in Chinese and knowledgeable in 3D printing, I hold certifications in Google Project Management, Learning Java 11, and GA4 Essential Training, aiming to transition into roles such as IT Auditor, IT Consultant, Information Security Analyst, or Network Technician.</p>
      </div>
    ),
    contact:(
      <div>
        <h1>Contact Me</h1>
        <p>Details on how to contact Edward Bao</p>
      </div>
    ),
    projects:(
      <div>
        <h1> My Projects</h1>
        <p> Details about Edward Bao's projects</p>
      </div>
    ),
  }),[]);

  const [currentContent, setCurrentContent] = useState(content.home);

  const handleContentChange = (contentKey) => {
    setCurrentContent(content[contentKey]);
    window.location.hash = contentKey;
  };

  useEffect(() =>{
    const hash = window.location.hash.replace('#','');
    if (hash && content[hash]){
      setCurrentContent(content[hash]);
    }
  },[content]);

  return (
    <div>
      <header className="header">
        <div className = "menu">
          <div className = "name"> Edward Bao</div>
        <ul className ="menu-list">
          <li className = "menu-list-items">
            <a href="#home" className="links" onClick={() => handleContentChange('home')}>Home</a>
          </li>
          <li className = "menu-list-items">
            <a href="#about" className="links" onClick={() => handleContentChange('about')}>About</a>
          </li>
          <li className = "menu-list-items">
            <a href="#contact" className="links" onClick={() => handleContentChange('contact')}>Contact</a>
          </li>
          <li className ="dropdown">
            <a href="#projects" className="links" onClick={() => handleContentChange('projects')}>Projects</a>
            <div className ="dropdown-content">
              <a href = "#project-management"> Project Management </a>
              <a href = "#web-design">Web Design</a>
              <a href = "#programming-databases">Programming/Databases</a>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <div id="content" className="content">
        {currentContent}
      </div>
    </div>
  );
}

export default App;
