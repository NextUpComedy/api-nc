export interface IPagination {
  limit: number,
  page: number,
  title?: string | undefined,
  id?: number | undefined,
}

export interface IMatchUserContent {
  id: string,
  userId: number,
  filmingCosts: string,
  launchDate: string,
  advance: string,
  feePaid: string
  recoveredCosts: string
}

export interface IChangeContentOwner {
  id: string,
  oldUserId: number,
  newUserId: number,
}
