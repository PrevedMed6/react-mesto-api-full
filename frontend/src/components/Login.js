import FormWithPassword from "./FormWithPassword";
export default function Login({ onLogin }) {
  return (
    <FormWithPassword
      buttonText="Войти"
      name="login"
      onSubmit={onLogin}
      header="Вход"
    />
  );
}
