import React, { useState, useEffect, useContext } from 'react'
import './signup.css'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)
  const [enteredName, setEnteredName] = useState('')
  const [enteredSurname, setEnteredSurname] = useState('')

  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid &&
          passwordIsValid &&
          enteredName.trim().length > 0 &&
          enteredSurname.trim().length > 0
      )
    })
    //backende az request atmak için bu kod var
    return () => {
      clearTimeout(identifier)
    }
  }, [
    enteredEmail,
    enteredPassword,
    enteredConfirmPassword,
    enteredName,
    enteredSurname,
  ])

  const nameHandler = (event) => {
    event.preventDefault()
    const enteredName = event.target.value
    const onlyLettersRegex =
      /^(|[\u0041-\u005a\u0061-\u007a\u00c0-\u00d6\u00d8-\u00f6\u011e\u015e\u011f\u015f\u00dc\u00fc\u0130\u0131]*(\s+[\u0041-\u005a\u0061-\u007a\u00c0-\u00d6\u00d8-\u00f6\u011e\u015e\u011f\u015f\u00dc\u00fc\u0130\u0131]*)*)$/

    // regular expression for letters only
    if (onlyLettersRegex.test(enteredName)) {
      setEnteredName(enteredName)
    }
    setFormIsValid(
      emailIsValid &&
        passwordIsValid &&
        enteredName.trim().length > 0 &&
        enteredSurname.trim().length > 0
    )
  }
  const surnameHandler = (event) => {
    event.preventDefault()
    const enteredSurName = event.target.value
    const onlyLettersRegex =
      /^(|[\u0041-\u005a\u0061-\u007a\u00c0-\u00d6\u00d8-\u00f6\u011e\u015e\u011f\u015f\u00dc\u00fc\u0130\u0131]*(\s+[\u0041-\u005a\u0061-\u007a\u00c0-\u00d6\u00d8-\u00f6\u011e\u015e\u011f\u015f\u00dc\u00fc\u0130\u0131]*)*)$/

    if (onlyLettersRegex.test(enteredSurName)) {
      setEnteredSurname(enteredSurName)
    }
    setFormIsValid(
      emailIsValid &&
        passwordIsValid &&
        enteredName.trim().length > 0 &&
        enteredSurname.trim().length > 0
    )
  }

  const togglePasswordVisibility = (event) => {
    event.preventDefault()
    setShowPassword((prevState) => !prevState)
  }

  const emailChangeHandler = (event) => {
    event.preventDefault()
    const enteredEmail = event.target.value
    setEnteredEmail(enteredEmail)
    setEmailIsValid(
      enteredEmail.includes('@') && enteredEmail.trim().length > 0
    )
    setFormIsValid(
      emailIsValid &&
        passwordIsValid &&
        enteredName.trim().length > 0 &&
        enteredSurname.trim().length > 0
    )
  }

  const passwordChangeHandler = (event) => {
    event.preventDefault()
    setEnteredPassword(event.target.value)
    setPasswordIsValid(
      event.target.value.trim() === enteredConfirmPassword.trim() &&
        event.target.value.trim().length >= 6
    )
    setFormIsValid(
      emailIsValid &&
        passwordIsValid &&
        enteredName.trim().length > 0 &&
        enteredSurname.trim().length > 0
    )
  }

  const confirmPasswordChangeHandler = (event) => {
    event.preventDefault()
    setEnteredConfirmPassword(event.target.value)
    setPasswordIsValid(
      event.target.value.trim() === enteredPassword.trim() &&
        event.target.value.trim().length > 6
    )
    setFormIsValid(
      emailIsValid &&
        passwordIsValid &&
        enteredName.trim().length > 0 &&
        enteredSurname.trim().length > 0
    )
  }

  function getPasswordStrength(password) {
    let score = 0

    if (!password) {
      return ''
    }

    // Add points for length
    const lengthScore = Math.min(1, password.length / 8)
    score += lengthScore

    // Add points for uppercase letters
    if (/[A-Z]/.test(password)) {
      score++
    }

    // Add points for lowercase letters
    if (/[a-z]/.test(password)) {
      score++
    }

    // Add points for numbers
    if (/[0-9]/.test(password)) {
      score++
    }

    // Add points for symbols
    if (/[^A-Za-z0-9]/.test(password)) {
      score++
    }

    if (score < 2) {
      return 'weak'
    } else if (score < 4) {
      return 'medium'
    } else {
      return 'strong'
    }
  }

  const submitHandler = async (event) => {
    const signUpInfo = {
      enteredName: enteredName,
      enteredSurname: enteredSurname,
      enteredEmail: enteredEmail,
      enteredPassword: enteredPassword,
    }
    event.preventDefault()
    const res = await axios.post(
      'http://127.0.0.1:3001/api/v1/users/signup',
      signUpInfo
    )
    if (res.data.status === 'success') {
      localStorage.setItem('uid', res.data.uid)
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ email: signUpInfo.email })
      )
      authCtx.onSignUp()
      navigate(0)
    }
    // handle signup logic
  }

  const exitHandlerSignInPage = (event) => {
    event.preventDefault()
    authCtx.exitHandler()
  }

  return (
    <div className="signup flex">
      <img
        className="exitButton"
        src="https://icon-library.com/images/x-button-icon/x-button-icon-17.jpg"
        onClick={exitHandlerSignInPage}
      />
      <form onSubmit={submitHandler} className="signup-form">
        <label htmlFor="name"></label>
        <input
          className="input-class mt-5 ml-4"
          placeholder="name"
          type="text"
          id="name"
          value={enteredName}
          onChange={nameHandler}
          onBlur={nameHandler}
        />
        <br />
        <label htmlFor="surname"></label>
        <input
          className="input-class mt-5 ml-4"
          placeholder="surname"
          type="text"
          id="surname"
          value={enteredSurname}
          onChange={surnameHandler}
          onBlur={surnameHandler}
        />
        <br />
        <label htmlFor="email"></label>
        <input
          className="input-class mt-5 ml-4"
          placeholder="e-mail"
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailChangeHandler}
        />
        {!emailIsValid && (
          <p className="error-text ml-4">Please enter a valid email address.</p>
        )}
        <br />
        <br />
        <label htmlFor="password"></label>
        <div className=" flex form-class ml-4">
          <input
            className="input-class"
            id="password"
            value={enteredPassword}
            type={showPassword ? 'text' : 'password'}
            onChange={passwordChangeHandler}
            onBlur={passwordChangeHandler}
            placeholder="password"
          />
          <a onClick={togglePasswordVisibility} className="buttonpassword">
            {showPassword ? (
              <img src="https://raw.githubusercontent.com/Hasan-S-SELCUK/photos/main/eye1.png" />
            ) : (
              <img src="https://cdn.discordapp.com/attachments/978313692519202867/1098617294650867772/eye2.png" />
            )}
          </a>
        </div>

        {!passwordIsValid && (
          <p className="error-text ml-4">
            Password should be at least 7 characters long.
          </p>
        )}
        <br />
        <div className="form-class ml-4">
          <input
            className="input-class"
            placeholder="confirm password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={enteredConfirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordChangeHandler}
          />
          <a onClick={togglePasswordVisibility} className="buttonpassword">
            {showPassword ? (
              <img src="https://raw.githubusercontent.com/Hasan-S-SELCUK/photos/main/eye1.png" />
            ) : (
              <img src="https://cdn.discordapp.com/attachments/978313692519202867/1098617294650867772/eye2.png" />
            )}
          </a>
        </div>
        {enteredPassword !== enteredConfirmPassword && (
          <p className="error-text ml-4">Passwords do not match.</p>
        )}
        <br />

        {passwordIsValid && (
          <div className="strength-meter">
            <p>Password strength:</p>
            <div
              class={`strength-meter__bar strength-meter__bar--${getPasswordStrength(
                enteredPassword
              )}`}
            />
          </div>
        )}
        <button
          type="submit"
          className="button-class ml-4"
          disabled={!formIsValid}
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpPage
