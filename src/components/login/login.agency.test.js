import React from 'react';
import Login from './login.component';
import { render, screen, waitFor, userEvent } from '../../testUtils'

import { CHARTS_PAGE } from "../../root/root.constants";

import i18next from "../../helpers/i18n/index";

const MOCK_CORRECT_USERNAME = "user@example.com"
const MOCK_CORRECT_PASSWORD = "password"

const loginLabel = i18next.t("LOGIN_PAGE.EMAIL_USERNAME")
const passwordLabel = i18next.t("LOGIN_PAGE.PASSWORD")
const loginButton = i18next.t("LOGIN_PAGE.LOGIN")

// --- mock AuthService ---
const mockLoginSuccess = jest.fn()

jest.mock('../../services/auth.service', () => ({
    getInstance: jest.fn().mockImplementationOnce(() => ({
        // FIXME: find a way to mock this dynamically between tests
        userRole: "agency",
        user: {
            agency: {
                name: "test-agency"
            }
        },
        authenticate: () => {
            mockLoginSuccess()
            return Promise.resolve()
        },
    }))
}))

// --- mock history ---
const mockHistory = jest.fn()
jest.mock('../../root/root.history', () => ({
    push: (location) => {
        mockHistory(location)
    } 
}))

describe('Login success', () => {
    test('Successful login of an Agency Admin', async () => {
        render(<Login />);

        userEvent.type(screen.getByLabelText(`${loginLabel}:`), MOCK_CORRECT_USERNAME)
        expect(await screen.findByDisplayValue(MOCK_CORRECT_USERNAME)).toBeInTheDocument()

        userEvent.type(screen.getByLabelText(`${passwordLabel}:`), MOCK_CORRECT_PASSWORD)
        expect(await screen.findByDisplayValue(MOCK_CORRECT_PASSWORD)).toBeInTheDocument()

        // NOTE: buttons have default role="button" even if not set
        userEvent.click(screen.getByRole('button', { name: loginButton }))

        // ASSERT redirect
        // NOTE: await waitFor(expect...) is needed after an async operation
        await waitFor(() => expect(mockLoginSuccess).toHaveBeenCalled())
        expect(mockHistory).toHaveBeenCalledWith(CHARTS_PAGE.replace(":id", "test-agency"))
    });
})
