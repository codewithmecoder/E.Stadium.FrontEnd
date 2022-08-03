import Link from 'next/link';
import {
  AiFillGithub,
  AiFillYoutube,
  AiOutlineInstagram,
} from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
function Footer() {
  return (
    <div className="flex gap-5 justify-center items-center h-[30%]">
      <Link href="https://www.instagram.com/nith__0102__">
        <a target="_blank">
          <AiOutlineInstagram fontSize={20} />
        </a>
      </Link>
      <Link href="https://www.facebook.com/CamstoreSVN">
        <a target="_blank">
          <BsFacebook fontSize={20} />
        </a>
      </Link>
      <Link href="https://www.youtube.com/channel/UCybYAuj3cEbTGbZyfejHx0A">
        <a target="_blank">
          <AiFillYoutube fontSize={20} />
        </a>
      </Link>
      <Link href="https://github.com/codewithmecoder?tab=repositories">
        <a target="_blank">
          <AiFillGithub fontSize={20} />
        </a>
      </Link>
    </div>
  );
}

export default Footer;
