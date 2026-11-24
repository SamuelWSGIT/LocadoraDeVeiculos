import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { ConfirmationPage } from '../pages/ConfirmationPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ReservationPage } from '../pages/ReservationPage'
import { VehicleDetailsPage } from '../pages/VehicleDetailsPage'

/** Mapa central de rotas para manter a navegação previsível e escalável. */
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<HomePage />} index />
          <Route element={<ReservationPage />} path="reservar" />
          <Route element={<VehicleDetailsPage />} path="veiculo/:vehicleId" />
          <Route element={<ConfirmationPage />} path="confirmacao" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
