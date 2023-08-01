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
  recoveredCosts: string,
  notes: string,
}

export interface IChangeContentOwner {
  id: string,
  oldUserId: number,
  newUserId: number,
}
export interface IChoosePaymentMethod {
  payload: {
    userId: number,
    preferredPayoutMethod: string,
    bankAccountNumber?: string,
    bankSortCode?: string,
    actName?: string,
    stripeAccountId?: string,
    vatPayer?: boolean,
    accountHolderName?: string,
    bankName?: string,
    ibanNumber?: string,
    swiftCode?: string,
    bicCode?: string,
    bankAddress?: string,
  }
}
