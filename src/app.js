// Amplify
import Amplify from "aws-amplify";

Amplify.configure({
  Auth: {
    identityPoolId: 'bc7eb79a-d3b2-4589-a16d-41d3a5cd8dc3',
    region: 'eu-central-1'
  }
});

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