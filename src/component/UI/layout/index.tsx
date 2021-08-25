import { FC } from 'react'
import Body from './Body'
import Footer from './Footer'
import NavBar from './Navbar'
import FooterNav from './Navbar/FooterNav'

const Layout: FC = (props) => {
  return (
    <>
      <NavBar />
      <Body>{props.children}</Body>
      <Footer />
      <FooterNav />
    </>
  )
}

export default Layout
