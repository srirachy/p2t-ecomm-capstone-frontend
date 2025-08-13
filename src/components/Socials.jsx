import '../styles/Socials.css';
import octocat from '../assets/octocat_logo.png';
import instagram from '../assets/instagram_logo.png';
import linkedin from '../assets/linkedin_logo.png';
import twitch from '../assets/twitch_logo.png';
import youtube from '../assets/youtube_logo.png'

const Socials = () => {
  return (
    <aside id='socials'>
      <figure><img src={octocat} alt='GitHub Octocat Logo' /></figure>
      <figure><img src={instagram} alt='Instagram Logo' /></figure>
      <figure><img src={linkedin} alt='LinkedIn Logo' /></figure>
      <figure><img src={twitch} alt='Twitch Logo' /></figure>
      <figure><img src={youtube} alt='YouTube Logo' /></figure>
    </aside>
  )
}

export default Socials;
