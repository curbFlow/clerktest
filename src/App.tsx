import { AppHeader } from "./Components";
import { Routes } from "./Routes";

export function App() {
  return (
    <div style={{ padding: 20 }}>
      <Routes header={<AppHeader />} />
    </div>
  );
}

export default App;
