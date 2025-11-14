interface AlertProps {
  message?: string | undefined
  type?: 'error' | 'success' | 'info'
}

export const Alert: React.FC<AlertProps> = ({ message, type = 'error' }) => {
  if (!message) return null

  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  )
}
