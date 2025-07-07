import Base from "./Button";
import Toggle from "./Toggle";

type TButton = typeof Base & {
  Toggle: typeof Toggle;
};

export const Button = Base as TButton;
Button.Toggle = Toggle;
