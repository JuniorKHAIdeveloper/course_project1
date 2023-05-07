import React from "react";
import { TextField, Button, Container, Stack } from "@mui/material";

const SitesForm = () => {
  const [siteName, setSiteName] = React.useState("");
  const [siteUrl, setSiteUrl] = React.useState("");
  const [siteSearchUrl, setSiteSearchUrl] = React.useState("");
  const [containerSelector, setContainerSelector] = React.useState("");
  const [itemSelector, setItemSelector] = React.useState("");
  const [imageSelector, setImageSelector] = React.useState("");
  const [titleSelector, setTitleSelector] = React.useState("");
  const [authorSelector, setAuthorSelector] = React.useState("");
  const [priceSelector, setPriceSelector] = React.useState("");
  const [availabelSelector, setAvailabelSelector] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const form = {
      siteName,
      siteUrl,
      siteSearchUrl,
      containerSelector,
      itemSelector,
      imageSelector,
      titleSelector,
      authorSelector,
      priceSelector,
      availabelSelector,
    };
    console.log(form)
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
          return res.json();
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .then((data) => {
        // setOpen(false);
        // setOpenAlert(true);
        // emptyForm();
        console.log(data)
      })
      .catch((e) => {
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
      </Stack>
      <Button variant="outlined" type="submit" sx={{mt: 2}}>
        Зберегти
      </Button>
    </form>
  );
};

export default SitesForm;
