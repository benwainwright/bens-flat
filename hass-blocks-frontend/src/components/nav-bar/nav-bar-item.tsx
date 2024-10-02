import Button from "@mui/material/Button";

interface NavBarItemProps {
  href: string;
  label: string;
}

export const NavBarItem = ({ href, label }: NavBarItemProps) => {
  return (
    <Button href={href} color="inherit">
      {label}
    </Button>
  );
};
