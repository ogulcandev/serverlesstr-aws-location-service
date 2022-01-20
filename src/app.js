// Amplify
import Amplify from "aws-amplify";
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

// Tailwind
import './assets/tailwind.css'

// Views
import Home from './views/home';

const App = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default App;