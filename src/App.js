import logo from './logo.svg';
import './App.css';
import * as rrweb from 'rrweb';
import { useRef } from 'react';

function App() {
  const events = useRef([])
  const stopRecord = useRef();
  const record = () => {
    stopRecord.current = rrweb.record({
      checkoutEveryNms: 10000,
      inlineImages: true,
      emit: (ev) => {
        events.current.push(JSON.stringify(ev));
      },
    })
  };
  const stop = () => {
    if (stopRecord.current) {
      stopRecord.current();
      console.log(events.current);
      const stringEvents = JSON.stringify(events.current);
      const includesDataUrl = stringEvents.includes('rr_dataURL');
      console.log('Includes Data URL attribute: ', includesDataUrl);
      events.current = [];
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={record}>Record</button>
        <button onClick={stop}>Stop</button>
      </header>
    </div>
  );
}

export default App;
