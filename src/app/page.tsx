import ExchangeRateGrid from '@/components/ExchangeRateGrid';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="main-layout">
      <div className="header-bar">
        <h1 className="page-title">Exchange Rates</h1>
      </div>

      <Suspense fallback={<p className="text-gray-500">Loading rates...</p>}>
        <ExchangeRateGrid />
      </Suspense>
    </main>
  );
}
