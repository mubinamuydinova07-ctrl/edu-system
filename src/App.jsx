import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CourseDetail from './pages/CourseDetail'
import Courses from './pages/Courses'
import Home from './pages/Home'
import MyLearning from './pages/MyLearning'
import NotFound from './pages/NotFound'
import Premium from './pages/Premium'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
