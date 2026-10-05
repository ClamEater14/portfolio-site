import * as Icons from "../Icons";
import AnimatedLink, { LinkProps } from ".";

export interface IconLinkProps extends LinkProps {
  icon: Icons.Icon;

  iconSize?: number;
  label?: string;
}

const AnimatedIconLink: React.FC<IconLinkProps> = ({ icon: Icon, iconSize = 32, label, ...linkProps }) => {
  return (
    <AnimatedLink {...linkProps}>
      <span className="d-inline-flex align-items-center gap-2 mw-100">
        <span aria-hidden="true" className="d-inline-flex flex-shrink-0">
          <Icon size={iconSize} />
        </span>
        {label && <span style={{ minWidth: 0, overflowWrap: "anywhere" }}>{label}</span>}
      </span>
    </AnimatedLink>
  );
};

export default AnimatedIconLink;
