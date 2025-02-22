import clsx from "clsx";
import s from "./Layout.module.scss";
import type { LayoutComponentType } from "./Layout.types";

const Layout: LayoutComponentType = (props) => {
  const { className = "", footer, header, children, sidebar } = props;

  return (
    <div className={clsx(s.layoutWrapper, className)}>
      {header}
      <div className={s.middle}>
        {sidebar}
        <div className={s.content}>{children}</div>
      </div>
      {footer}
    </div>
  );
};

export default Layout;
