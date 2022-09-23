import { AppShell } from "@mantine/core";
import { AppHeader } from "./AppHeader";
import { Routes } from "./Routes";

export function App() {
  return (
    <AppShell padding="xl">
      <Routes header={<AppHeader />} />
    </AppShell>
  );
}

export default App;
