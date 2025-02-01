import AnimatedLink, { LinkProps } from ".";
import * as Icons from "../Icons";

export interface IconLinkProps extends LinkProps {
  icon: Icons.Icon;

  iconSize?: number;
}

const AnimatedIconLink: React.FC<IconLinkProps> = ({ icon, iconSize = 32, ...linkProps }) => {
  return <AnimatedLink {...linkProps}>{icon({ size: iconSize })}</AnimatedLink>;
};

export default AnimatedIconLink;
