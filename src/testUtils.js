// read TESTS.md for setup details

import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { render } from '@testing-library/react'
import { I18nextProvider } from "react-i18next";
import i18next from "./helpers/i18n/index";
import userEvent from '@testing-library/user-event'

const AllTheProviders = ({ children }) => {
  return (
  <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
  </I18nextProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'
export { userEvent }

// override render method
export { customRender as render }