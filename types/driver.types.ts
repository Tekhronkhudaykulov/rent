export interface Driver {
  id: string
  photo: string
  fullName: string
  passportSeries: string
  driverLicense: string
  citizenship: string
  createdAt: Date
}

export interface CreateDriverData {
  photo: File | null
  fullName: string
  passportSeries: string
  driverLicense: string
  citizenship: string
}
