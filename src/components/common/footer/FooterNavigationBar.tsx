import "./FooterNavigationBar.css";
import FooterNavigationItem from "./FooterNavigationItem";

interface FooterNavigationBaseProps {
  page: string;
}

const FooterNavigationBar: React.FC<FooterNavigationBaseProps> = ({ page }) => {
  return (
    <div className="footerFixedContainer">
      <div className="footerContainer">
        <FooterNavigationItem title="Home" page={page} moveTo="/home" />
        <FooterNavigationItem title="Orders" page={page} moveTo="/orders" />
        <FooterNavigationItem title="Account" page={page} moveTo="/account" />
      </div>
    </div>
  );
};

export default FooterNavigationBar;
