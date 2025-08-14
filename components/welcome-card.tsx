export function WelcomeCard() {
  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-[#FF9F43] flex items-center justify-center text-white font-bold">
          PF
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">Hello Peter</h2>
          <p className="text-sm text-[#666]">New cases are waiting</p>
        </div>
      </div>
    </div>
  )
}
