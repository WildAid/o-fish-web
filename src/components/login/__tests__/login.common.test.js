import React from 'react';
import Login from '../login.component';
import { render, screen, waitFor, userEvent } from '../../../testUtils'

import history from "../../../root/root.history"

import { HOME_PAGE, RESTORE_PASSWORD_PAGE } from "../../../root/root.constants.js";

import { MOCK_CORRECT_USERNAME, MOCK_CORRECT_PASSWORD, MOCK_INCORRECT_USERNAME,
    MOCK_INCORRECT_PASSWORD, LOGIN_LABEL, PASSWORD_LABEL, LOGIN_BUTTON, FORGOT_PASSWORD
} from "../__fixtures__/data"

// --- mock AuthService ---
const mockLoginSuccess = jest.fn()
const mockLoginFailed = jest.fn()

const mockAuthenticate = (login, password) => {
    if (login === MOCK_CORRECT_USERNAME && password === MOCK_CORRECT_PASSWORD) {
        mockLoginSuccess()
        return Promise.resolve()
    } else {
        mockLoginFailed()
        return Promise.reject({message: "invalid username/password"})
    }
}

jest.mock('../../../services/auth.service', () => ({
    getInstance: jest.fn().mockImplementationOnce(() => ({
        // FIXME: find a way to mock the userRole dynamically between tests in the same file
        userRole: "field", // Field Officer or Group Admin,
        authenticate: (login, password) => mockAuthenticate(login, password),
        agency: {
            name: "test-agency"
        }
    }))
}))

jest.mock("../../../root/root.history")

describe('Login form UI', () => {
    test('renders initial form', () => {
        render(<Login />);
    
        expect(screen.getByAltText(/WildAid.*MongoDB/)).toBeInTheDocument();
        expect(screen.getByText(LOGIN_LABEL)).toBeInTheDocument();
        expect(screen.getByText(`${PASSWORD_LABEL}:`)).toBeInTheDocument();
        expect(screen.getByText(LOGIN_BUTTON)).toBeInTheDocument();
        expect(screen.getByText(FORGOT_PASSWORD)).toBeInTheDocument();
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

        userEvent.type(screen.getByLabelText(`${LOGIN_LABEL}:`), MOCK_CORRECT_USERNAME)
        expect(await screen.findByDisplayValue(MOCK_CORRECT_USERNAME)).toBeInTheDocument()

        userEvent.type(screen.getByLabelText(`${PASSWORD_LABEL}:`), MOCK_CORRECT_PASSWORD)
        expect(await screen.findByDisplayValue(MOCK_CORRECT_PASSWORD)).toBeInTheDocument()

        // NOTE: buttons have default role="button" even if not set
        userEvent.click(screen.getByRole('button', { name: LOGIN_BUTTON }))

        // ASSERT redirect
        await waitFor(() => expect(mockLoginSuccess).toHaveBeenCalled())
        expect(history.push).toHaveBeenCalledWith(HOME_PAGE)
    });
})


describe('Forgot password', () => {
    test('Links to restore_password page', async() => {
        render(<Login />);

        const forgotPasswordLink = screen.getByRole('link', {name: FORGOT_PASSWORD })
        expect(forgotPasswordLink.getAttribute("href")).toEqual(RESTORE_PASSWORD_PAGE)

        userEvent.click(forgotPasswordLink)

        await waitFor(() => expect(global.window.location.pathname).toEqual(RESTORE_PASSWORD_PAGE))
    })
})
