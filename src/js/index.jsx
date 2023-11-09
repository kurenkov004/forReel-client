import { createRoot } from 'react-dom/client';

// Import statement, specifies that './index.scss' needs to be bundled
import "../styles/index.scss";

//Main component
const ForReelApplication = () => {
  return (
    <div className='for-reel'>
      <div>Good morning</div>
    </div>
  );
};

//Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render the app in the roor DOM element
root.render(<ForReelApplication />);

