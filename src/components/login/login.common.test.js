import React from 'react';
import Login from './login.component';
import { render, screen, waitFor, userEvent } from '../../testUtils'

import { HOME_PAGE } from "../../root/root.constants";

import { RESTORE_PASSWORD_PAGE } from "../../root/root.constants.js";

import i18next from "../../helpers/i18n/index";

const MOCK_CORRECT_USERNAME = "user@example.com"
const MOCK_CORRECT_PASSWORD = "password"
const MOCK_INCORRECT_USERNAME = "blah"
const MOCK_INCORRECT_PASSWORD= "blah"

const loginLabel = i18next.t("LOGIN_PAGE.EMAIL_USERNAME")
const passwordLabel = i18next.t("LOGIN_PAGE.PASSWORD")
const loginButton = i18next.t("LOGIN_PAGE.LOGIN")
const forgotPassword = i18next.t("LOGIN_PAGE.FORGOT_PASSWORD")

// --- mock AuthService ---
const mockLoginSuccess = jest.fn()
const mockLoginFailed = jest.fn()

const mockAuthenticate = (login, password) => {
    return new Promise((resolve, reject) => {
        if (login === MOCK_CORRECT_USERNAME && password === MOCK_CORRECT_PASSWORD) {
            mockLoginSuccess();
            resolve()
        } else {
            mockLoginFailed()
            reject({
                message: "invalid username/password"
            })
        }
    })
}

jest.mock('../../services/auth.service', () => ({
    getInstance: jest.fn().mockImplementationOnce(() => ({
        // FIXME: find a way to mock the userRole dynamically between tests in the same file
        userRole: "field", // Field Officer or Group Admin,
        authenticate: (login, password) => mockAuthenticate(login, password),
        agency: {
            name: "test-agency"
        }
    }))
}))

// --- mock history ---
const mockHistory = jest.fn()
jest.mock('../../root/root.history', () => ({
    push: (location) => {
        mockHistory(location)
    } 
}))

describe('Login form UI', () => {
    test('renders initial form', () => {
        render(<Login />);
    
        expect(screen.getByAltText(/WildAid.*MongoDB/)).toBeInTheDocument();
        expect(screen.getByText(loginLabel)).toBeInTheDocument();
        expect(screen.getByText(`${passwordLabel}:`)).toBeInTheDocument();
        expect(screen.getByText(loginButton)).toBeInTheDocument();
        expect(screen.getByText(forgotPassword)).toBeInTheDocument();
    });
})

describe('Login failed', () => {
    test('Wrong username, correct password', async() => {
        render(<Login />);
        
        userEvent.type(screen.getByLabelText("Email/Username::"), MOCK_INCORRECT_USERNAME)
        expect(await screen.findByDisplayValue(MOCK_INCORRECT_USERNAME)).toBeInTheDocument()

        userEvent.type(screen.getByLabelText("Password:"), MOCK_CORRECT_PASSWORD)
        expect(await screen.findByDisplayValue(MOCK_CORRECT_PASSWORD)).toBeInTheDocument()

        // NOTE: buttons have default role="button" even if not set
        userEvent.click(screen.getByRole('button', { name: /log in/i }))

        // ASSERT
        await waitFor(() => expect(mockLoginFailed).toHaveBeenCalled())
        expect(screen.getByText(/invalid username/i)).toBeInTheDocument()
    })

    test('Wrong password, correct username', async() => {
        render(<Login />);
        
        userEvent.type(screen.getByLabelText("Email/Username::"), MOCK_CORRECT_USERNAME)
        expect(await screen.findByDisplayValue(MOCK_CORRECT_USERNAME)).toBeInTheDocument()

        userEvent.type(screen.getByLabelText("Password:"), MOCK_INCORRECT_PASSWORD)
        expect(await screen.findByDisplayValue(MOCK_INCORRECT_PASSWORD)).toBeInTheDocument()

        // NOTE: buttons have default role="button" even if not set
        userEvent.click(screen.getByRole('button', { name: /log in/i }))

        // ASSERT
        await waitFor(() => expect(mockLoginFailed).toHaveBeenCalled())
        expect(screen.getByText(/invalid username/i)).toBeInTheDocument()
    })
})

describe('Login success', () => {
    test('Successful login of a Field Officer', async () => {
        render(<Login />);

        // screen.debug(loginInput)

        userEvent.type(screen.getByLabelText(`${loginLabel}:`), MOCK_CORRECT_USERNAME)
        expect(await screen.findByDisplayValue(MOCK_CORRECT_USERNAME)).toBeInTheDocument()

        userEvent.type(screen.getByLabelText(`${passwordLabel}:`), MOCK_CORRECT_PASSWORD)
        expect(await screen.findByDisplayValue(MOCK_CORRECT_PASSWORD)).toBeInTheDocument()

        // NOTE: buttons have default role="button" even if not set
        userEvent.click(screen.getByRole('button', { name: loginButton }))

        // ASSERT redirect
        await waitFor(() => expect(mockLoginSuccess).toHaveBeenCalled())
        expect(mockHistory).toHaveBeenCalledWith(HOME_PAGE)
    });
})


describe('Forgot password', () => {
    test('Links to restore_password page', async() => {
        render(<Login />);

        const forgotPasswordLink = screen.getByRole('link', {name: forgotPassword })
        expect(forgotPasswordLink.getAttribute("href")).toEqual(RESTORE_PASSWORD_PAGE)

        userEvent.click(forgotPasswordLink)

        await waitFor(() => expect(global.window.location.pathname).toEqual(RESTORE_PASSWORD_PAGE))
    })
})
