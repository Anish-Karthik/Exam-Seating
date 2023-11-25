"use client"

import {
  RecoilRoot,
} from 'recoil';
import React, { PropsWithChildren } from 'react'

const layout = ({ children }: PropsWithChildren) => {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  )
}

export default layout