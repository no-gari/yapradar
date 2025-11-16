import { Twitter, Github, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <h3>YapRadar</h3>
            <p>AI-powered X(Twitter) Assistant for crypto yappers</p>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Product</h4>
          <ul>
            <li><a href="#analyze">Analyze</a></li>
            <li><a href="#draft">Draft Assistant</a></li>
            <li><a href="#membership">Membership</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#docs">Documentation</a></li>
            <li><a href="#api">API</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#terms">Terms</a></li>
            <li><a href="#privacy">Privacy</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="footer-social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Github">
              <Github size={20} />
            </a>
            <a href="mailto:hello@yapradar.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 YapRadar. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
