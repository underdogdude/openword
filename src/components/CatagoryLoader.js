import React from "react"
import ContentLoader from "react-content-loader"

const CaragoryLoader = (props) => (
    <ContentLoader 
    speed={2}
    width={`100%`}
    height={110}
    viewBox="0 0 350 130"
    backgroundColor="#8034ad"
    foregroundColor="#681796"
    {...props}
  >
    <circle cx="296" cy="59" r="50" /> 
    <rect x="13" y="18" rx="2" ry="2" width="162" height="17" /> 
    <rect x="13" y="51" rx="2" ry="2" width="162" height="17" /> 
    <rect x="14" y="87" rx="2" ry="2" width="162" height="17" />
  </ContentLoader>
)


export default CaragoryLoader;