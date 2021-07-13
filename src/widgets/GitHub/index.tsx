import './styles.css';

import GitHubLogo from 'static/github.png';

const GitHub = (): JSX.Element => {
  return (
    <a
      href="https://github.com/justinpo/notes-app"
      target="_blank"
      rel="noreferrer"
      className="GitHub"
    >
      <img src={GitHubLogo} alt="GitHub Logo" className="GitHub__image" />
    </a>
  );
};

export default GitHub;
