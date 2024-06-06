'use client'
import { RecoilRoot } from 'recoil';

function RecoilWrapper({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default RecoilWrapper;