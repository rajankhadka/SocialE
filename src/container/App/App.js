import './App.css';

//importing components
import LoginRegisterUI from '../../components/UI/LoginRegisterUI/LoginRegisterUI';


function App() {
  const appHeight = window.innerHeight;
  console.log(appHeight);
  return (
    <LoginRegisterUI />
  );
}

export default App;
