interface HeadingProps {
  text: string;
}

const Header = (props: HeadingProps) => {
  return <h1>{props.text}</h1>;
};

export default Header;
