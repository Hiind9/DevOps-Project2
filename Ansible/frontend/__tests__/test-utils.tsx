import React from 'react'
import { render as rtlRender } from '@testing-library/react'

function render(ui: React.ReactElement, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => children,
    ...options,
  })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render } 