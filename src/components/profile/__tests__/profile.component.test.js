import React from 'react'
import Profile from '../profile.component'

import { render, screen, userEvent } from '../../../testUtils'

import history from '../../../root/root.history'

// we only need to spy, so mock without a mocked root.history file
jest.mock("../../../root/root.history")

// mock user fieldOfficer returned by mocked services
jest.mock('../../../services/auth.service')
jest.mock('../../../services/stitch.service')
jest.mock('../../../services/agency.service.js')

describe('Cancel button', () => {
    test('must go back to previous page', () => {
        render(<Profile />)

        userEvent.click(screen.getByText('Cancel'))

        expect(history.go).toHaveBeenCalledWith(-1)
    })
})
