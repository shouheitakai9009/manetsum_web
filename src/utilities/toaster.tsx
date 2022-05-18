import { toast, ToastContainer, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions: ToastOptions = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3000,
  theme: "colored",
}

const Toaster = () => {
  const success = (content: string, options?: ToastOptions) => {
    toast.success(content, Object.assign(defaultOptions, options))
  }
  const warning = (content: string, options?: ToastOptions) => {
    toast.warning(content, Object.assign(defaultOptions, options))
  }
  const error = (content: string, options?: ToastOptions) => {
    toast.error(content, Object.assign(defaultOptions, options))
  }
  const render = () => <ToastContainer />

  return { success, warning, error, render }
}

export default Toaster