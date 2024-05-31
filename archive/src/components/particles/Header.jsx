const Header = ({ innerHTML }) => {
  return <header dangerouslySetInnerHTML={{ __html: innerHTML }}></header>
}

export default Header
