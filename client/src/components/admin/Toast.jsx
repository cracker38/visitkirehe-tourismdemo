import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export function Toasts({ toasts, remove }) {
  return createPortal(
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center justify-between gap-3 ${
            t.type === 'error' ? 'bg-red-600 text-white' : 'bg-nature text-white'
          }`}
        >
          <span>{t.message}</span>
          <button type="button" onClick={() => remove(t.id)} className="opacity-80 hover:opacity-100">×</button>
        </div>
      ))}
    </div>,
    document.body
  )
}

let toastId = 0
let addFn = () => {}

export function setToastAdd(fn) {
  addFn = fn
}

export function toast(message, type = 'success') {
  addFn({ id: ++toastId, message, type })
}
