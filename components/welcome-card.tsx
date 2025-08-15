export function WelcomeCard() {
  return (
    <div className="bg-[#FFF8F3] rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#FF9F43] to-[#FF7F50] flex items-center justify-center text-white font-bold text-lg shadow-lg">
            PF
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-[#333] mb-1">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-[#666] text-base">
              Your daily grind fuels your dreams. Let's make today count.
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-[#999] mb-1">Today's Focus</div>
          <div className="text-lg font-semibold text-[#FF9F43]">
            Code • Build • Scale
          </div>
        </div>
      </div>
    </div>
  );
}
