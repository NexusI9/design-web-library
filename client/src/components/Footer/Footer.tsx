import "./Footer.scss";
import { LangContext } from "@components/Language/Language";
import { useContext } from "react";

export default () => {
  const { lang } = useContext(LangContext);

  return <footer className="padding-v-xl"></footer>;
};
