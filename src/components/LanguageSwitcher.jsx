import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中' },
  { code: 'ja', label: '日' },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="lang-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-switcher__btn ${i18n.language?.startsWith(lang.code) ? 'lang-switcher__btn--active' : ''}`}
          onClick={() => i18n.changeLanguage(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
