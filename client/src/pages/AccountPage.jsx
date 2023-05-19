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
  Typography,
} from "@mui/material";
import UserBooks from "../components/account/UserBooks";
import Modal from "../core/Modal";
import Login from "../components/account/Login";

export default function Account({ isAdmin, isAuth, setIsAuth, setIsAdmin, setAlert }) {
  const [userInfo, setUserInfo] = React.useState({});
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (isAuth) getUserInfo();
  }, [isAuth]);

  const handleDelete = () => {
    const userId = localStorage.getItem("userId");
    const data = { userId };
    unAuth();
    fetch("/user", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // loading status
        if (res.ok) {
          // fetchSites();
          localStorage.setItem("isAuth", false);
          setIsAuth(false);
          setAlert({ type: "success", message: "Видалено успішно." });
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .catch((e) => {
        setAlert({ type: "error", message: "Виникла помилка." });
        console.log(e);
      });
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
          localStorage.setItem("userId", data.userId);
          setIsAdmin(true);
        } else {
          localStorage.setItem("isAdmin", false);
          localStorage.setItem("userId", data.userId);
          setIsAdmin(false);
        }
        getUserInfo();
      })
      .catch((error) => {
        setAlert({ type: "error", message: "Невірний логін або пароль." });
        console.log(error);
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
          setAlert({ type: "success", message: "Зареєстровано успішно." });
          // must reload
          // window.location.pathname = "/admin/page/product";
          // return res.json();
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .catch((error) => {
        setAlert({ type: "error", message: "Виникла помилка." });
        console.log(error);
      });
  };

  const getUserInfo = () => {
    fetch("/user", {
      method: "POST",
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // loading status
        if (res.ok) {
          // setOpenAlert(true);
          // must reload
          // window.location.pathname = "/admin/page/product";
          return res.json();
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .then((data) => {
        setUserInfo(data);
        // console.log(data);
      });
  };

  const submitHandler = (e, isRegistration, data) => {
    if (isRegistration) {
      const enteredEmail = data.email;
      const enteredPassword = data.password1;

      const url = "/registration";
      registr(url, enteredEmail, enteredPassword);
    } else {
      const enteredEmail = data.email;
      const enteredPassword = data.password;

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
          setUserInfo({});
          // must reload
          // window.location.pathname = "/admin/page/product";
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!isAuth && (
        <Card sx={{ p: 4, width: "fit-content", mx: "auto" }}>
          <Login submitHandler={submitHandler} />
        </Card>
      )}
      {isAuth && (
        <>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={2}
              sx={{
                borderBottom: {
                  xs: "1px solid rgb(224, 224, 224)", // Color on extra-small screens
                  md: "none", // Color on extra-small screens
                },
                borderRight: {
                  xs: "none", // Color on extra-small screens
                  md: "1px solid rgb(224, 224, 224)", // Color on extra-small screens
                },
              }}
            >
              <Typography variant="h5" sx={{ my: 2 }}>
                {userInfo?.login}
              </Typography>
              {!isAdmin && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setModalOpen(true)}
                  sx={{ mb: 2 }}
                >
                  Видалити
                </Button>
              )}
              <div></div>
              <Button variant="contained" onClick={unAuth} sx={{ mb: 2 }}>
                Вийти
              </Button>
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
                Вподобання
              </Typography>
              <UserBooks results={userInfo?.books} getUserInfo={getUserInfo} />
            </Grid>
          </Grid>
        </>
      )}

      {modalOpen && (
        <Modal
          message={"Ваш акаунт буде видалено."}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          acceptHandler={handleDelete}
        />
      )}
    </>
  );
}
