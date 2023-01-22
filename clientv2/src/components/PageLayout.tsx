import Navbar from './Navbar'

interface IProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: IProps) {
  return (
    <div className="bg-gray-100">
      <main className="flex min-h-screen flex-col">
        <Navbar />
        {children}
      </main>
    </div>
  )
}
