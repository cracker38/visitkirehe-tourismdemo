import { useState, useCallback, useEffect } from 'react'
import { Toasts, setToastAdd } from './Toast'

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const add = useCallback((t) => {
    setToasts((prev) => [...prev, t])
  }, [])

  useEffect(() => {
    setToastAdd((t) => {
      add(t)
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== t.id)), 4000)
    })
    return () => setToastAdd(() => {})
  }, [add])

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <>
      {children}
      <Toasts toasts={toasts} remove={remove} />
    </>
  )
}
