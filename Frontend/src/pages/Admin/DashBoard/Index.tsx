import Title from '../Title/index'
import { Box } from '@mui/material'

// type Props = {}

const DashBoard = () => {
  return (
    <>
      <Title Title="DashBoard" />
      <Box sx={{ width: "100%", minHeight: 800 }} >
      <h2>Dashboard</h2>
      </Box>
    </>
  )
}
export default DashBoard