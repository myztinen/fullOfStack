interface HeadingProps {
  courseName: string;
}

const Header = (props: HeadingProps) => {
  return <h1>{props.courseName}</h1>;
};

export default Header;
