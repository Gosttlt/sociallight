"use client";

import clsx from "clsx";
import s from "./Header.module.scss";
import type { HeaderComponentType } from "./Header.types";

import Logo from "@/6Shared/assets/svg/Logo.svg";
import Link from "next/link";
import { useAppSelector } from "@/6Shared/hooks/reduxHooks";
import { selectUser } from "@/5Entities/Auth/model/userSelectors";
import Button from "@/6Shared/uikit/Button";
import Logout from "@/4Features/Auth/Logout";
import { useRouter } from "next/navigation";

const Header: HeaderComponentType = (props) => {
  const { email } = useAppSelector(selectUser);
  const { className = "" } = props;
  const navigate = useRouter();

  return (
    <header className={clsx(s.headerWrapper, className)}>
      <Link className={s.logo} href="/">
        <Logo />
      </Link>

      {email ? (
        <div className={s.userInfoWrapper}>
          <div>{email}</div>
          <Logout />
        </div>
      ) : (
        <div style={{ display: "flex", gap: "12px" }}>
          <Button onClick={() => navigate.push("/login")}>
            Зарегистрироваться
          </Button>
          <Button onClick={() => navigate.push("/login")}>Войти</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
