// Amplify
import Amplify from "aws-amplify";

Amplify.configure({
  Auth: {
    identityPoolId: 'eu-central-1:bc7eb79a-d3b2-4589-a16d-41d3a5cd8dc3',
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_wD10zrgGo',
    userPoolWebClientId: '7tajoukpihgse7pft406hhn7t1',
  },
  geo: {
    AmazonLocationService: {
      maps: {
        items: {
          "lsdemomap2-dev": {
            style: "Esri Light",
          },
        },
        default: "lsdemomap2-dev",
      },
      region: 'eu-central-1',
    },
  },
})

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