import styled from "styled-components"
import Announcement from "../components/Announcement"
import Navbar from "../components/Navbar"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Container = styled.div`

`

const Title = styled.h1`
  margin: 20px;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`

const Option = styled.option``

const ProductList = () => {
  const location = useLocation();
  const madanhmuc = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("moinhat");
  const [mangTen, setMangTen] = useState([]);
  const [tenDanhMuc, setTenDanhMuc] = useState("");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  console.log(filters, sort);

  useEffect(() => {
    const getTenThuCung = async () => {
      const tenthucungres = await axios.post("http://localhost:3001/api/products/getTenThuCung", {madanhmuc: madanhmuc});
      console.log("tenthucungres: ", tenthucungres);
      setMangTen(tenthucungres.data);
      setTenDanhMuc(tenthucungres.data[0].tieudedanhmuc);
    }
    getTenThuCung();
  }, [madanhmuc])
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Danh mục thú cưng: <span style={{color: "var(--color-primary)"}}>{tenDanhMuc}</span></Title>
      <FilterContainer>
        <Filter>
          <FilterText>Bộ lọc thú cưng:</FilterText>
          <Select name="tenthucung" onChange={handleFilters}>
            <Option disabled>
              Tên thú cưng
            </Option>
            <Option value="">Tất cả</Option>
            {
              mangTen 
              ?
              mangTen.map((tenthucung, key) => {
                return (
                  <Option value={tenthucung.tenthucung}>{tenthucung.tenthucung}</Option>
                );
              })
              : null
            }
          </Select>
          <Select name="gioitinhthucung" onChange={handleFilters}>
            <Option disabled>
              Giới tính thú cưng
            </Option>
            <Option value="">Tất cả</Option>
            <Option value="Đực">Đực</Option>
            <Option value="Cái">Cái</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sắp xếp theo:</FilterText>
          <Select onChange={e => setSort(e.target.value)} >
            <Option value="moinhat">Mới nhất</Option>
            <Option value="tangdan">Giá tăng dần</Option>
            <Option value="giamdan">Giá giảm dần</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products madanhmuc={madanhmuc} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList