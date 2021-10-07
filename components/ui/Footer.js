import TMDBLogo from '../../assets/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg';

const Footer = () => {
  return (
    <div className="text-center">
      <div className="mb-10">
        <small>API</small>
      </div>
      <div className="footer">
        <img width="349" height="25" alt={'TMDB Api'} src={TMDBLogo} />
      </div>
    </div>
  );
};

export default Footer;
