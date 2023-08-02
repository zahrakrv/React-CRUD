import { Link } from 'react-router-dom';
import Button from '../components/tools/Button';
const NavBar = () => {
  return (
    <div className="mt-6">
      <h1 className="flex items-center justify-center bg-blue-800 h-24 text-white font-bold text-4xl">
        CRUD Project
      </h1>
      <div className="container flex gap-5 p-4">
        <Link to="/">
          {' '}
          <Button color="blue">Home</Button>
        </Link>
        <Link to="/persons">
          {' '}
          <Button color="blue">Persons Lists</Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
