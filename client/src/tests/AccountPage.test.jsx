import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Login from "../components/account/Login";
import React from "react";

const enteredEmail = `test${Date.now()}`;
const enteredPassword = "testtest";
const shortPassword = "test";
const wrongPassword = "test";

describe("AccountPage", () => {
  it("account registration form (wrong password match)", () => {
    const submitHandler = jest.fn();
    const { getByTestId, getAllByText } = render(
      <Login submitHandler={submitHandler} />
    );

    const registrationCheckbox = getByTestId("registration");
    fireEvent.click(registrationCheckbox);

    const loginInput = getByTestId("login");
    fireEvent.change(loginInput, { target: { value: enteredEmail } });
    expect(loginInput.value).toBe(enteredEmail);

    const password1Input = getByTestId("password1");
    fireEvent.change(password1Input, { target: { value: enteredPassword } });
    expect(password1Input.value).toBe(enteredPassword);

    const password2Input = getByTestId("password2");
    fireEvent.change(password2Input, { target: { value: wrongPassword } });
    expect(password2Input.value).toBe(wrongPassword);

    const submitButton = getByTestId("submit");
    fireEvent.click(submitButton);

    expect(submitHandler).toHaveBeenCalledTimes(0);
    const messageElement = getAllByText("Паролі не співпадають.")[0];
    expect(messageElement).toBeInTheDocument();
  });

  it("account registration form (short password)", () => {
    const submitHandler = jest.fn();
    const { getByTestId, getAllByText } = render(
      <Login submitHandler={submitHandler} />
    );

    const registrationCheckbox = getByTestId("registration");
    fireEvent.click(registrationCheckbox);

    const loginInput = getByTestId("login");
    fireEvent.change(loginInput, { target: { value: enteredEmail } });
    expect(loginInput.value).toBe(enteredEmail);

    const password1Input = getByTestId("password1");
    fireEvent.change(password1Input, { target: { value: shortPassword } });
    expect(password1Input.value).toBe(shortPassword);

    const password2Input = getByTestId("password2");
    fireEvent.change(password2Input, { target: { value: shortPassword } });
    expect(password2Input.value).toBe(shortPassword);

    const submitButton = getByTestId("submit");
    fireEvent.click(submitButton);

    expect(submitHandler).toHaveBeenCalledTimes(0);
    const messageElement = getAllByText(
      "Довижна пароля не менше 8 симолів."
    )[0];
    expect(messageElement).toBeInTheDocument();
  });

  it("account registration form", () => {
    const submitHandler = jest.fn();
    const { getByTestId } = render(<Login submitHandler={submitHandler} />);

    const registrationCheckbox = getByTestId("registration");
    fireEvent.click(registrationCheckbox);

    const loginInput = getByTestId("login");
    fireEvent.change(loginInput, { target: { value: enteredEmail } });
    expect(loginInput.value).toBe(enteredEmail);

    const password1Input = getByTestId("password1");
    fireEvent.change(password1Input, { target: { value: enteredPassword } });
    expect(password1Input.value).toBe(enteredPassword);

    const password2Input = getByTestId("password2");
    fireEvent.change(password2Input, { target: { value: enteredPassword } });
    expect(password2Input.value).toBe(enteredPassword);

    const submitButton = getByTestId("submit");
    fireEvent.click(submitButton);

    expect(submitHandler).toHaveBeenCalledTimes(1);
    expect(submitHandler).toHaveBeenCalledWith(
      expect.anything(),
      true,
      expect.objectContaining({
        email: expect.any(String),
        password: expect.any(String),
      })
    );
  });

  it("account registration api", async () => {
    const response = await fetch("http://127.0.0.1:3000/registration", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(200);
  });

  it("account login form", () => {
    const submitHandler = jest.fn();
    const { getByTestId } = render(<Login submitHandler={submitHandler} />);

    const loginInput = getByTestId("login");
    fireEvent.change(loginInput, { target: { value: enteredEmail } });
    expect(loginInput.value).toBe(enteredEmail);

    const passwordInput = getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: enteredPassword } });
    expect(passwordInput.value).toBe(enteredPassword);

    const submitButton = getByTestId("submit");
    fireEvent.click(submitButton);

    expect(submitHandler).toHaveBeenCalledTimes(1);
    expect(submitHandler).toHaveBeenCalledWith(
      expect.anything(),
      false,
      expect.objectContaining({
        email: expect.any(String),
        password: expect.any(String),
      })
    );
  });

  it("account login api", async () => {
    const response = await fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(200);
  });

  it("account protected logout api", async () => {
    const response = await fetch("http://127.0.0.1:3000/logout");

    expect(response.status).toBe(401);
  });
});
