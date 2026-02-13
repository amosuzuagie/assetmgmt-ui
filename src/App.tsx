import { Toaster } from 'react-hot-toast';
import './App.css'
import { AppRouter } from './app/router';
import { Sidebar } from './pages/AppSidebar';
import { TopBar } from './pages/TopBar';

function App() {
  return (
    <>
    <Toaster position='top-right' />
      <div className='flex'>
        <Sidebar />

        <div className='ml-64 flex min-h-screen w-full flex-col'>
          <TopBar />
          <main className='pt-16 px-4'>
            <AppRouter />
          </main>
        </div>
      </div>
    </>
  )
}
export default App
