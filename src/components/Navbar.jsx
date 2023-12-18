import {Link,Routes,Route} from 'react-router-dom';
import FirstContent from './FirstContent';
import SecondContent from './SecondContent';
import ThirdContent from './ThirdContent';

export default function Navbar() {
  return (
      <header className="header header-navigation-container">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link to="/" className="navbar-brand order-1 order-lg-2"><img src='src/assets/titulo.png' style={{width: 100}}/></Link>
            <FirstContent />
            <SecondContent />
            <ThirdContent />
          </nav>
        </div>
      </header>
    );
}
