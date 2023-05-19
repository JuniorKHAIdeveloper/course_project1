import React from "react";
import { TextField, Button, Container, Stack } from "@mui/material";

const SitesForm = ({ setAlert }) => {
  const [siteName, setSiteName] = React.useState("");
  const [siteUrl, setSiteUrl] = React.useState("");
  const [siteSearchUrl, setSiteSearchUrl] = React.useState("");
  const [siteLogoUrl, setSiteLogoUrl] = React.useState("");
  const [containerSelector, setContainerSelector] = React.useState("");
  const [itemSelector, setItemSelector] = React.useState("");
  const [imageSelector, setImageSelector] = React.useState("");
  const [titleSelector, setTitleSelector] = React.useState("");
  const [authorSelector, setAuthorSelector] = React.useState("");
  const [priceSelector, setPriceSelector] = React.useState("");
  const [availabelSelector, setAvailabelSelector] = React.useState("");
  const [bookUrlSelector, setBookUrlSelector] = React.useState("");

  const clearForm = () => {
    setSiteName("");
    setSiteUrl("");
    setSiteSearchUrl("");
    setSiteLogoUrl("");
    setContainerSelector("");
    setItemSelector("");
    setImageSelector("");
    setTitleSelector("");
    setAuthorSelector("");
    setPriceSelector("");
    setAvailabelSelector("");
    setBookUrlSelector("");
  };

  function handleSubmit(event) {
    event.preventDefault();

    const form = {
      siteName,
      siteUrl,
      siteSearchUrl,
      siteLogoUrl,
      containerSelector,
      itemSelector,
      imageSelector,
      titleSelector,
      authorSelector,
      priceSelector,
      availabelSelector,
      bookUrlSelector,
    };
    console.log(form);
    fetch("/site", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // loading status
        if (res.ok) {
          setAlert({ type: "success", message: "Збережено успішно." });
          clearForm();
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .catch((e) => {
        setAlert({ type: "error", message: "Виникла помилка." });
        console.log(e);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          type="text"
          variant="outlined"
          label="Назва ресурсу"
          onChange={(e) => setSiteName(e.target.value)}
          value={siteName}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          label="Адреса ресурсу"
          onChange={(e) => setSiteUrl(e.target.value)}
          value={siteUrl}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          label="Логотип"
          onChange={(e) => setSiteLogoUrl(e.target.value)}
          value={siteLogoUrl}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          label="Адресу пошуку"
          onChange={(e) => setSiteSearchUrl(e.target.value)}
          value={siteSearchUrl}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          label="Селектор контейнеру"
          onChange={(e) => setContainerSelector(e.target.value)}
          value={containerSelector}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          label="Селектор елементу"
          onChange={(e) => setItemSelector(e.target.value)}
          value={itemSelector}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          label="Селектор картинки"
          onChange={(e) => setImageSelector(e.target.value)}
          value={imageSelector}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          label="Селектор назви"
          onChange={(e) => setTitleSelector(e.target.value)}
          value={titleSelector}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          label="Селектор автора"
          onChange={(e) => setAuthorSelector(e.target.value)}
          value={authorSelector}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          label="Селектор ціни"
          onChange={(e) => setPriceSelector(e.target.value)}
          value={priceSelector}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          label="Селектор наявності"
          onChange={(e) => setAvailabelSelector(e.target.value)}
          value={availabelSelector}
          fullWidth
        />
        <TextField
          type="text"
          variant="outlined"
          label="Посилання на книгу"
          onChange={(e) => setBookUrlSelector(e.target.value)}
          value={bookUrlSelector}
          fullWidth
        />
      </Stack>
      <Button variant="contained" color="success" type="submit" sx={{ mt: 2 }}>
        Зберегти
      </Button>
    </form>
  );
};

export default SitesForm;
