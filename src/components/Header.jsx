import {Link,Routes,Route} from 'react-router-dom';
import FirstContent from './FirstContent';
import SecondContent from './SecondContent';
import ThirdContent from './third-contents';


export default function Header() {
  return (
      <header className="header header-absolute">
      
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link to="/" className="navbar-brand order-1 order-lg-2">CYCLE'S</Link>
            <FirstContent />
            <SecondContent />
            <ThirdContent />
          </nav>
        </div>
      </header>
    );
}
