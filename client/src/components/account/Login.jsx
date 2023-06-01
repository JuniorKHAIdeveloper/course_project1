import * as React from "react";
import {
  Button,
  Grid,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const Login = ({ submitHandler }) => {
  const [isRegistration, setIsRegistartion] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState({
    isValid: true,
    message: "",
  });
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const resetForm = () => {
    setIsRegistartion(false);
    setEmail("");
    setPassword("");
    setPassword1("");
    setPassword2("");
  };

  let additionalProps = {};

  if (!isPasswordValid.isValid) {
    additionalProps = {
      helperText: isPasswordValid.message,
    };
  }

  const registrationHandler = (event) => {
    setIsRegistartion(event.target.checked);
  };

  const passwordValidation = () => {
    if (isRegistration && password1 !== password2) {
      setIsPasswordValid({ isValid: false, message: "Паролі не співпадають." });
      return false;
    } else if (
      isRegistration &&
      (password1.length < 8 || password2.length < 8)
    ) {
      setIsPasswordValid({
        isValid: false,
        message: "Довижна пароля не менше 8 симолів.",
      });
      return false;
    } else {
      setIsPasswordValid({ isValid: true, message: "" });
      return true;
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!passwordValidation()) return;

    if (isRegistration) {
      submitHandler(event, isRegistration, { email, password: password1 });
      resetForm();
    } else {
      submitHandler(event, isRegistration, { email, password });
    }
  };

  return (
    <form onSubmit={formSubmitHandler} data-testid="form">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={12}>
          <TextField
            label="Логін"
            variant="standard"
            onChange={(event) => setEmail(event.target.value)}
            inputProps={{ "data-testid": "login" }}
            value={email}
          />
        </Grid>
        {!isRegistration && (
          <Grid item xs={12}>
            <TextField
              label="Пароль"
              variant="standard"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              inputProps={{ "data-testid": "password" }}
              value={password}
            />
          </Grid>
        )}
        {isRegistration && (
          <Grid item xs={12}>
            <TextField
              label="Пароль"
              variant="standard"
              type="password"
              onChange={(event) => setPassword1(event.target.value)}
              error={!isPasswordValid.isValid}
              {...additionalProps}
              inputProps={{ "data-testid": "password1" }}
              value={password1}
            />
          </Grid>
        )}
        {isRegistration && (
          <Grid item xs={12}>
            <TextField
              label="Підтвердження пароля"
              variant="standard"
              type="password"
              onChange={(event) => setPassword2(event.target.value)}
              error={!isPasswordValid.isValid}
              {...additionalProps}
              inputProps={{ "data-testid": "password2" }}
              value={password2}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={registrationHandler}
                  inputProps={{ "data-testid": "registration" }}
                  checked={isRegistration}
                />
              }
              label="Реєстрація"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" data-testid="submit">
            {isRegistration ? "Зареєструватися" : "Увійти"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
