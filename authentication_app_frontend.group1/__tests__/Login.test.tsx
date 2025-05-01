import { screen } from '@testing-library/react'
import Login from '@/components/Login'
import { render } from './test-utils'

// Mock the LoginForm component
jest.mock('@/components/LoginForm', () => {
  return function MockedLoginForm() {
    return (
      <div data-testid="mock-login-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </div>
    )
  }
})

describe('Login Component', () => {

  it('has a link to register page', () => {
    render(<Login />)
    
    const registerLink = screen.getByText('Register.')
    expect(registerLink).toHaveAttribute('href', '/register')
  })

  it('renders the separator with "or" text', () => {
    render(<Login />)
    
    expect(screen.getByText('or')).toBeInTheDocument()
  })
}) 