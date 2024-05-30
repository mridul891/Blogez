
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const SharePost = ({ shareUrl, title }) => {
  return (
    <div className="flex sharepost">
      <div>
        <FacebookShareButton url={shareUrl} quote={title} className="w-full ">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
      <div>
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default SharePost;
