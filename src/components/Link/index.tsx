"use client";

import { UrlObject } from "url";
import { HTMLAttributeAnchorTarget } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { AppConfig } from "../../config/AppConfig";

type Url = string | UrlObject;

export interface LinkProps {
  href: Url;
  className?: string;
  ariaLabel?: string;
  rel?: string;
  target?: HTMLAttributeAnchorTarget;
  color?: string;
  hoveredColor?: string;
  enlargeOnHover?: boolean;
  enlargedScale?: number;
  animationDuration?: number;
  children?: any;
}

const AnimatedLink: React.FC<LinkProps> = ({
  href,
  className,
  ariaLabel,
  rel,
  target,
  color = "#FFFFFF",
  hoveredColor = AppConfig.primaryColor,
  enlargeOnHover = false,
  enlargedScale = 1.5,
  animationDuration = 0.25,
  children,
}) => {
  return (
    <motion.span
      initial={{ scale: 1 }}
      whileHover={{
        scale: enlargeOnHover ? enlargedScale : 1,
      }}
      transition={{ duration: animationDuration }}
    >
      <Link className={className} aria-label={ariaLabel} href={href} rel={rel} target={target}>
        <motion.span
          initial={{ color: color }}
          whileHover={{
            color: hoveredColor,
          }}
          transition={{ duration: animationDuration }}
        >
          {children}
        </motion.span>
      </Link>
    </motion.span>
  );
};

export default AnimatedLink;
