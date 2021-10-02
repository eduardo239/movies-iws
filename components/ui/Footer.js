import TMDBLogo from '../../assets/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg';
import Image from 'next/image';
const Footer = ({ children }) => {
  return (
    <div className="text-center">
      <div className="mb-10">
        <small>API</small>
      </div>
      <Image width="349" height="25" alt={'TMDB Api'} src={TMDBLogo} />
    </div>
  );
};

export default Footer;
