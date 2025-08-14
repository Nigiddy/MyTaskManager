import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

type Meeting = {
  id: number
  title: string
  time: string
  endTime: string
}

export function Calendar() {
  const meetings: Meeting[] = [
    { id: 1, title: "Meeting for case 1", time: "7:00", endTime: "8:30" },
    { id: 2, title: "Meeting for case 2", time: "11:00", endTime: "12:30" },
    { id: 3, title: "Meeting for case 3", time: "14:00", endTime: "15:30" },
  ]

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">MY CALENDAR</h2>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-[#FF9F43]">
          <MoreHorizontal size={16} />
        </Button>
      </div>

      <div>
        <div className="mb-2">
          <h3 className="font-medium">MON 16</h3>
        </div>

        <div className="space-y-3">
          {meetings.map((meeting, index) => (
            <div key={meeting.id} className="flex">
              <div className="text-xs text-[#666] w-16 pt-1">
                {meeting.time}
                <div className="text-xs text-[#999]">
                  {meeting.time} - {meeting.endTime}
                </div>
              </div>
              <div className="flex-1 bg-[#FFE8D6] rounded-lg p-2 text-sm">{meeting.title}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 mb-2">
          <h3 className="font-medium">TUE 17</h3>
        </div>

        <div className="flex">
          <div className="text-xs text-[#666] w-16 pt-1">
            14:00
            <div className="text-xs text-[#999]">14:00 - 15:30</div>
          </div>
          <div className="flex-1 bg-[#FFE8D6] rounded-lg p-2 text-sm">Meeting for case 3</div>
        </div>
      </div>
    </div>
  )
}
