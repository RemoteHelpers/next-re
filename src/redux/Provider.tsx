'use client';
import { Provider } from 'react-redux';
import { store } from './store';

export default function StoreProvider({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
