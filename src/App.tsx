import Dashboard from "./components/Dashboard"
import Sidebar from "./components/Sidebar"
import { Menu, X } from "lucide-react"
import { useDashboard } from "./hooks/useDashboard"

const App = () => {
  const { sidebarOpen, setSidebarOpen } = useDashboard();

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <Sidebar />
        </div>

        {/* Close Button at Bottom - Mobile Only */}
        <div className="lg:hidden fixed bottom-0 left-0 w-72 p-4 bg-white border-t border-gray-200">
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            aria-label="Close sidebar"
          >
            <X size={20} />
            <span className="font-medium">Close Sidebar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mr-2"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 mr-2"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-2 md:p-6 lg:p-8">
            <Dashboard />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App