import { screen } from '@testing-library/react'
import Register from '@/components/Register'
import { render } from './test-utils'

// Mock the RegisterForm component
jest.mock('@/components/RegisterForm', () => {
  return function MockedRegisterForm() {
    return (
      <div data-testid="mock-register-form">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </div>
    )
  }
})

describe('Register Component', () => {
  it('renders register form', () => {
    render(<Register />)
    
    // Check if the register heading is present
    expect(screen.getByText('Register')).toBeInTheDocument()
    
    // Check if the login link is present
    expect(screen.getByText(/Already have an account/)).toBeInTheDocument()
    
    // Check if the mocked register form is present
    expect(screen.getByTestId('mock-register-form')).toBeInTheDocument()
  })

  it('has a link to login page', () => {
    render(<Register />)
    
    const loginLink = screen.getByText('Login.')
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('renders the separator with "or" text', () => {
    render(<Register />)
    
    expect(screen.getByText('or')).toBeInTheDocument()
  })
}) 