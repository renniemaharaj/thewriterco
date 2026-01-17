import { motion } from "framer-motion";
import { min } from "lodash";
import type { ReactNode } from "react";

const Motion = ({
  unique,
  index,
  children,
  className,
  cap,
}: {
  index: number;
  unique?: string;
  children: ReactNode;
  className?: string;
  cap?: boolean;
}) => {
  return (
    <motion.div
      key={index + "tabsItem" + unique}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: cap ? min([index * 0.2, 0.8]) : index * 0.2,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
