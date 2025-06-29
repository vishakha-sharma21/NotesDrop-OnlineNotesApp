import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import './App.css';

/*const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path: "/pastes",
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>
    }
  ]
);

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}*/



function App() {
  return (
    <Provider store={store}> {/* Provide the store to the entire app */}
      <BrowserRouter>
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
          <Toaster position="top-right" reverseOrder={false} toastOptions={{
            className: '',
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#4ade80', // green-400
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: '#f87171', // red-400
                secondary: 'white',
              },
            }
          }} />
          
          <Navbar />

          <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pastes" element={<Paste />} />
              <Route path="/pastes/:id" element={<ViewPaste />} />
            </Routes>
          </main>

          <footer className="bg-gray-800 text-center p-4 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NotesDrop. All rights reserved.
          </footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}




export default App
