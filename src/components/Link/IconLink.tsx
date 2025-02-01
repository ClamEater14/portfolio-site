import { motion } from "framer-motion";
import { Icons } from "../Icons";
import { AppConfig } from "../../config/AppConfig";
import AnimatedLink, { LinkProps } from ".";

export interface IconLinkProps extends LinkProps {
  icon: Icons.Icon;
  iconSize?: number;
}

const AnimatedIconLink: React.FC<IconLinkProps> = ({
  icon,
  iconSize = 32,
  ...linkProps
}) => {
  return <AnimatedLink {...linkProps}>{icon({ size: iconSize })}</AnimatedLink>;
};

export default AnimatedIconLink;
