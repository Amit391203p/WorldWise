import styles from './CountryItem.module.css';

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <img src={`https://flagcdn.com/24x18/${country.emoji}.png`} alt="flag" />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
