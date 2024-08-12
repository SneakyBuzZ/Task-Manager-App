import '@/styles/globals.css';
import DashBoard from '@/pages/DashBoard';
import { QueryProvider } from './lib/query/QueryProvider';

function App() {
  return (
    <QueryProvider>
      <section className="w-full h-screen">
        <DashBoard />
      </section>
    </QueryProvider>
  );
}

export default App;
