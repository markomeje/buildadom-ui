import React, { CSSProperties } from 'react'
import { FadeLoader } from 'react-spinners'

type IProps = {
  loading: boolean
  css_properties: CSSProperties
}

const SpinnerLoader = ({ loading, css_properties }: IProps) => {
  return (
    <FadeLoader
      color="#0156FF"
      loading={loading}
      cssOverride={css_properties}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
}

export default SpinnerLoader
