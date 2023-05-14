import * as React from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";


export default function Login({ isAuth, setIsAuth, setIsAdmin }) {
  const [isRegistration, setIsRegistartion] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [openAlert, setOpenAlert] = React.useState(false);
  console.log(isPasswordValid);
  const emailInputRef = React.useRef();
  const passwordInputRef = React.useRef();
  const password1InputRef = React.useRef();
  const password2InputRef = React.useRef();

  const passwordValidation = () => {
    if (password1InputRef.current.value === password2InputRef.current.value) {
      setIsPasswordValid(true);
      return true;
    } else {
      setIsPasswordValid(false);
      return false;
    }
  };

  const auth = (url, enteredEmail, enteredPassword) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // loading status
        if (res.ok) {
          localStorage.setItem("isAuth", true);
          setIsAuth(true);
          // must reload
          // window.location.pathname = "/admin/page/product";
          return res.json();
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .then((data) => {
        console.log(data);
        if (data.role === "admin") {
          localStorage.setItem("isAdmin", true);
          setIsAdmin(true);
        }
      });
  };

  const registr = (url, enteredEmail, enteredPassword) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // loading status
        if (res.ok) {
          setOpenAlert(true);
          // must reload
          // window.location.pathname = "/admin/page/product";
          return res.json();
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isRegistration) {
      if (!passwordValidation()) return;

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = password1InputRef.current.value;

      const url = "/registration";
      registr(url, enteredEmail, enteredPassword);
    } else {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      const url = "/login";
      auth(url, enteredEmail, enteredPassword);
    }
  };

  const unAuth = () => {
    fetch("logout")
      .then((res) => {
        // loading status
        if (res.ok) {
          localStorage.setItem("isAuth", false);
          setIsAuth(false);
          localStorage.setItem("isAdmin", false);
          setIsAdmin(false);
          // must reload
          // window.location.pathname = "/admin/page/product";
          return res.json();
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  const registrationHandler = (event) => {
    setIsRegistartion(event.target.checked);
  };

  let additionalProps = {};

  if (!isPasswordValid) {
    additionalProps = {
      helperText: "Паролі не співпадають.",
    };
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {!isAuth && (
        <Card sx={{ p: 4, width: "fit-content", mx: "auto" }}>
          <form onSubmit={submitHandler}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item xs="12">
                <TextField
                  label="Логін"
                  variant="standard"
                  inputRef={emailInputRef}
                />
              </Grid>
              {!isRegistration && (
                <Grid item xs="12">
                  <TextField
                    label="Пароль"
                    variant="standard"
                    type="password"
                    inputRef={passwordInputRef}
                  />
                </Grid>
              )}
              {isRegistration && (
                <Grid item xs="12">
                  <TextField
                    label="Пароль"
                    variant="standard"
                    type="password"
                    inputRef={password1InputRef}
                    error={!isPasswordValid}
                    {...additionalProps}
                  />
                </Grid>
              )}
              {isRegistration && (
                <Grid item xs="12">
                  <TextField
                    label="Підтвердження пароля"
                    variant="standard"
                    type="password"
                    inputRef={password2InputRef}
                    error={!isPasswordValid}
                    {...additionalProps}
                  />
                </Grid>
              )}
              <Grid item xs="12">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={registrationHandler} />}
                    label="Реєстрація"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs="12">
                <Button variant="contained" type="submit">
                  {isRegistration ? "Зареєструватися" : "Увійти"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      )}
      {isAuth && (
        <Button variant="contained" onClick={unAuth}>
          Вийти
        </Button>
      )}

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Акаунт створено успішно.
        </Alert>
      </Snackbar>
    </Container>
  );
}
