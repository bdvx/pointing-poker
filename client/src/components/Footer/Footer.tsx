import './Footer.scss';
import { FC } from 'react';
import { APP_AUTHORS_GITHUB_USERNAME } from '../../constants';
import rsschool from '../../assets/icons/rsschool.svg';

export const Footer: FC = () => {
  return (
    <footer className="Footer">
      <div className="Footer__container">
        <a className="Footer__rss" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
          <img src={ rsschool } alt="RS School" />
          <span>'21</span>
        </a>
        
        <ul className="Footer__githubList">
          {
            APP_AUTHORS_GITHUB_USERNAME.map((username) => (
              <li>
                <a href={ `https://github.com/${ username }`} target="_blank" rel="noopener noreferrer">&copy;{ username }</a>
              </li>
            ))
          }
        </ul>
      </div>
    </footer>
  );
};