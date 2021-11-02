
import './App.css';
import Dragon from './components/Dragon';
import Generation from './components/Generation';

const App = () => {
  return (
    <div className="App">
      <h2>Dragon Stack</h2>
      <Generation/>
      <Dragon/>
    </div>
  );
}

export default App;
