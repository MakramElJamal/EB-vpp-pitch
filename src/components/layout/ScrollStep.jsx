export default function ScrollStep({ isActive, children, className = '' }) {
  return (
    <div
      data-step
      className={`step-text ${isActive ? 'active' : 'inactive'} ${className}`}
    >
      {children}
    </div>
  )
}
