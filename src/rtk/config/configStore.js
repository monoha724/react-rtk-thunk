import { configureStore } from '@reduxjs/toolkit'
import cardsSlice from '../modules/module'

export const store = configureStore({
  reducer: {
    cards: cardsSlice
  },
})