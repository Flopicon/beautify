import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [orderHistory, setOrderHistory] = useState([])

  const signup = (email, password, name) => {
    // Mock signup - store user info
    setUser({
      id: Date.now(),
      name,
      email,
      password, // In real app, never store plaintext!
    })
    return true
  }

  const login = (email, password) => {
    // Mock login - just check if user exists
    if (user && user.email === email && user.password === password) {
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setOrderHistory([])
  }

  const addOrder = (order) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: order.items,
      total: order.total,
      status: 'Completed',
    }
    setOrderHistory([newOrder, ...orderHistory])
    return newOrder.id
  }

  const value = {
    user,
    orderHistory,
    signup,
    login,
    logout,
    addOrder,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
