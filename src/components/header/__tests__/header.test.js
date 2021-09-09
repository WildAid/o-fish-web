import React from 'react'
import Header from '../header.component'
import { render, screen } from '../../../testUtils'

import { fieldOfficer } from '../../../__fixtures__/users'

// mock user fieldOfficer returned by mocked services
jest.mock('../../../services/auth.service')
jest.mock('../../../services/stitch.service')
jest.mock('../../../services/agency.service.js')

describe('Header', () => {
    test('render user profile name', () => {
        render(<Header />)

        expect(screen.getByText(`${fieldOfficer.name.first} ${fieldOfficer.name.last}`)).toBeInTheDocument()
    })
})
