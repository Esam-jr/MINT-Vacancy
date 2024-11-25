import '../assets/css/loader.css';
import loader from '../assets/img/preloader-8d5a7d18.gif';

function Loading() {
  return (
    <>
      <div className="position-absolute loader">
        <img src={loader} alt="Loader animation" />
      </div>
    </>
  );
}

export default Loading;
