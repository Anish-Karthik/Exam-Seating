"use client"

import React, { PropsWithChildren } from "react"
import { RecoilRoot } from "recoil"

const layout = ({ children }: PropsWithChildren) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default layout
