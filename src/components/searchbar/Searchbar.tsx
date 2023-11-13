import './searchbar.scss';

interface Props {
  searchHandler: (str: string) => void;
}

function Searchbar(props: Props) {
  const { searchHandler } = props;
  return (
    <input
      onChange={(e) => searchHandler(e.target.value)}
      type="text"
      className="searchbar"
      placeholder="Search for products"
    />
  );
}

export default Searchbar;
