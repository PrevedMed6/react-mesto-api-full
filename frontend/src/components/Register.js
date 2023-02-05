import { Link } from "react-router-dom";
import FormWithPassword from "./FormWithPassword";

export default function Register({onRegister}) {
  return (
    <div className="register">
      <FormWithPassword
        buttonText="Зарегистрироваться"
        name="register"
        header="Регистрация"
        onSubmit={onRegister}
      />
      <Link className="register__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}
