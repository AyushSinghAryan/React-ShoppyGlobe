import { Provider } from "react-redux"
import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import store from "./utils/store";
import { Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <Provider store={store}>
        <Header />
        {/*  Toaster is useful for notification like product add to cart or remove it will notify the user */}
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Outlet />
      </Provider>

    </>
  )
}

export default App
