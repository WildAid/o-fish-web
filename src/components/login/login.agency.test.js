import React from 'react';
import Login from './login.component';
import { render, screen, waitFor, userEvent } from '../../testUtils'

import history from "../../root/root.history"

import { CHARTS_PAGE } from "../../root/root.constants";

import { MOCK_CORRECT_USERNAME, MOCK_CORRECT_PASSWORD, 
         LOGIN_LABEL, PASSWORD_LABEL, LOGIN_BUTTON, 
} from "./test.helper"

const mockLoginSuccess = jest.fn()

jest.mock('../../services/auth.service', () => {
    const user = {
        userRole: "agency",
        user: {
            agency: {
                name: "test-agency"
            }
        },
    }

    const authenticate = function() {
        mockLoginSuccess()
        return Promise.resolve()
    }

    return {
        getInstance: () => ({
            ...user,
            authenticate: authenticate,
        })
    }
})


jest.mock("../../root/root.history")

test('Successful login of an Agency Admin', async () => {
    render(<Login />);

    userEvent.type(screen.getByLabelText(`${LOGIN_LABEL}:`), MOCK_CORRECT_USERNAME)
    expect(await screen.findByDisplayValue(MOCK_CORRECT_USERNAME)).toBeInTheDocument()

    userEvent.type(screen.getByLabelText(`${PASSWORD_LABEL}:`), MOCK_CORRECT_PASSWORD)
    expect(await screen.findByDisplayValue(MOCK_CORRECT_PASSWORD)).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: LOGIN_BUTTON }))

    // ASSERT
    await waitFor(() => expect(mockLoginSuccess).toHaveBeenCalled())
    expect(history.push).toHaveBeenCalledWith(CHARTS_PAGE.replace(":id", "test-agency"))
});
