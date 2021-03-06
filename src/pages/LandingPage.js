import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import LandingBodyComponent from '../components/LandingBodyComponent';
import { messageToast } from '../redux/toastSlice';
import 'react-toastify/dist/ReactToastify.css';

function LadingPage() {
  const messageSent = useSelector((state) => state.toast.message);
  const messageValue = useSelector((state) => state.toast.messageValue);
  const dispatch = useDispatch();

  useEffect(() => {
    const openToast = () => {
      toast(messageValue, { autoClose: 2500, hideProgressBar: true });
    };
    messageSent && openToast();
    dispatch(messageToast(false));
  }, [messageSent, dispatch, messageValue]);

  return (
    <div className='landingPage_showcase'>
      <HeaderComponent />
      <LandingBodyComponent />
      <FooterComponent />
      <ToastContainer />
    </div>
  );
}

export default LadingPage;
