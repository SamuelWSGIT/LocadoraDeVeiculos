/** Dados apresentados em cada cartão da frota. */
export type Vehicle = {
  id: string
  name: string
  subtitle?: string
  category: string
  passengers: number
  luggage: number
  transmission: string
  pricePerDay: number
  image: string
}
