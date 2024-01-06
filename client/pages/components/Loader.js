//populate with progress bar code
import styles from "../../styles/Loader.module.css";
import { HashLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <HashLoader color="#eeeeee" size={80} />
    </div>
  );
};

export default Loader;
