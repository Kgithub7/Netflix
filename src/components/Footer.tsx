import YoutubeIcon from "../assets/youtube_icon.png";
import InstagramIcon from "../assets/instagram_icon.png";
import TwitterIcon from "../assets/twitter_icon.png";
import FacebookIcon from "../assets/facebook_icon.png";

const Footer = () => {
  return (
    <div className="m-[0_auto] max-w-250 py-7.5 text-sm text-[#808080]">
      <div className="my-10 flex gap-x-5 [&>*]:w-7.5 [&>*]:cursor-pointer">
        <img src={FacebookIcon} />
        <img src={InstagramIcon} />
        <img src={TwitterIcon} />
        <img src={YoutubeIcon} />
      </div>
      <ul className="mb-7.5 grid grid-cols-[auto_240px_auto_auto] gap-4 [&>*]:cursor-pointer [&>*]:hover:underline">
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Center</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Netflix Shop</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
        <li>Do Not Sell or Share My Personal Information</li>
        <li>Ad Choices</li>
      </ul>
      <p>&copy; 1997-2025 Netflix, Inc.</p>
    </div>
  );
};

export default Footer;
