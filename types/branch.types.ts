export interface WorkingHours {
  day: string
  time: string
}

export interface Branch {
  id: number
  region: string
  city: string
  address: string
  name: string
  phone: string
  working_hours: WorkingHours[]
  latitude: string
  longitude: string
}

export interface BranchSelectorProps {
  branches: Branch[]
  selectedBranch?: Branch | null
  onBranchSelect: (branch: Branch) => void
  onClose: () => void
  isOpen: boolean
}
