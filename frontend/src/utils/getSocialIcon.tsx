import { 
  SiInstagram, SiFacebook, SiSpotify, 
  SiApplemusic, SiYoutube, SiGithub, SiX 
} from "react-icons/si";

export const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'instagram': return <SiInstagram />;
    case 'facebook': return <SiFacebook />;
    case 'spotify': return <SiSpotify />;
    case 'apple-music': return <SiApplemusic />;
    case 'youtube': return <SiYoutube />;
    case 'github': return <SiGithub />;
    case 'x': return <SiX />;
    default: return null;
  }
};