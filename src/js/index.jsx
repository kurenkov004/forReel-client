//This file only has one job: to bootstrap React code and nothing else

import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
// import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

// Import statement, specifies that './index.scss' needs to be bundled
import "../styles/index.scss";

//Main component
const ForReelApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

//Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render the app in the root DOM element
root.render(<ForReelApplication />);

