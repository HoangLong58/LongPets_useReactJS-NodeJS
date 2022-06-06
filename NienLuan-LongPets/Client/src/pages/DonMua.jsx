import { ClearOutlined, RemoveRedEyeOutlined } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../css/main.css";
import { useSelector } from 'react-redux';
import format_money from "../utils";
import ReactPaginate from "react-paginate";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

const Container = styled.div`
`
const Wrapper = styled.div`
max-width: 1200px;
margin: 20px auto;
overflow: hidden;
background-color: #f8f9fa;
box-shadow: 0 2px 3px #e0e0e0;
display: flex;
flex-direction: column;
`

const Table = styled.table`
    background: var(--color-white);
    width: 100%;
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    text-align: center;
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
    &:hover {
        box-shadow: none;
    }
`

const Thead = styled.thead`

`

const Tr = styled.tr`
    &:last-child td {
        border: none;
    }
    &:hover {
        background: var(--color-light);
    }
`

const Th = styled.th`

`

const Tbody = styled.tbody`

`

const Td = styled.td`
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
`

const ButtonInfo = styled.button`
    width: 40px;
    height: 30px;
    border: 2px solid var(--color-info);
    border-radius: var(--border-radius-2);
    color: var(--color-warnning);
    background: var(--color-white);
    padding:0px;
    outline:none;
    z-index: 2;
    cursor: pointer;
`
const RecentOrders = styled.div`
    // margin-top: 10px;
    padding: 2rem;
`
const H2 = styled.h2`
    margin-bottom: 0.8rem;
`

const ButtonDelete = styled.button`
width: 40px;
height: 30px;
border: 2px solid var(--color-danger);
border-radius: var(--border-radius-2);
color: var(--color-danger);
background: var(--color-white);
padding:0px;
outline:none;
z-index: 2;
cursor: pointer;
`
const DonMua = () => {
  // Lấy user từ Redux User
  const user = useSelector(state => state.user.currentUser);

  // Các state khởi tạo
  const [donhang, setDonHang] = useState([]);
  const [reRenderData, setReRenderData] = useState(true);   // State để Compo KhachHangRight và KhachHangMain thay đổi Effect


  // Useeffect lấy data
  useEffect(() => {
    const getDonHang = async () => {
      const donhangres = await axios.post("http://localhost:3001/api/order/getDonHangUser", { manguoimua: user ? user.manguoimua : null });
      console.log("Lấy đơn hàng của user donhangres: ", donhangres);
      setDonHang(donhangres.data);
    }
    getDonHang();
  }, [reRenderData])

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("")
  const [donHangModal, setDonHangModal] = useState(null);

  const openModal = (modal) => {
    setShowModal(prev => !prev);
    setTypeModal(modal.type);
    setDonHangModal(modal.donhang);
  }

  // ===== TOAST =====
  const [dataToast, setDataToast] = useState({ message: "alo alo", type: "success" });
  const toastRef = useRef(null);  // useRef có thể gọi các hàm bên trong của Toast
  // bằng các dom event, javascript, ...

  const showToastFromOut = (dataShow) => {
    console.log("showToastFromOut da chay", dataShow);
    setDataToast(dataShow);
    toastRef.current.show();
  }

  // PHÂN TRANG

  const [pageNumber, setPageNumber] = useState(0);

  const donHangPerPage = 12;
  const pageVisited = pageNumber * donHangPerPage;

  const donHangChuyenTrang = donhang
    .slice(pageVisited, pageVisited + donHangPerPage)
    .map(donhangitem => {
      return (
        <Tr>
          <Td>{donhangitem.madathang}</Td>
          <Td>{donhangitem.hotendathang}</Td>
          <Td>{donhangitem.sodienthoaidathang}</Td>
          <Td>{donhangitem.diachidathang}</Td>
          <Td>{donhangitem.tongtiendathang ? format_money((donhangitem.tongtiendathang).toString()) : null}</Td>
          {
            donhangitem.tentrangthaidathang === "Chờ xác nhận"
              ?
              <Td style={{ backgroundColor: "var(--color-warning)" }}>{donhangitem.tentrangthaidathang}</Td>
              :
              donhangitem.tentrangthaidathang === "Đang giao dịch"
                ?
                <Td style={{ backgroundColor: "var(--color-info)" }}>{donhangitem.tentrangthaidathang}</Td>
                :
                donhangitem.tentrangthaidathang === "Hoàn thành"
                  ?
                  <Td style={{ backgroundColor: "var(--color-success)" }}>{donhangitem.tentrangthaidathang}</Td>
                  :
                  donhangitem.tentrangthaidathang === "Đã hủy"
                    ?
                    <Td style={{ backgroundColor: "var(--color-danger)" }}>{donhangitem.tentrangthaidathang}</Td>
                    : null
          }
          <Td className="info">
            <ButtonInfo
              onClick={() => openModal({ type: "chitietdonhang", donhang: donhangitem })}
            >
              <RemoveRedEyeOutlined />
            </ButtonInfo>
          </Td>
          <Td className="danger">
            <ButtonDelete
              onClick={() => openModal({ type: "huydonhang", donhang: donhangitem  })}
            >
              <ClearOutlined />
            </ButtonDelete>
          </Td>
        </Tr>
      );
    }
    );


  const pageCount = Math.ceil(donhang.length / donHangPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <RecentOrders>
          <H2>Lịch sử đặt mua</H2>
          <Table>
            <Thead>
              <Tr>
                <Th>Mã đơn hàng</Th>
                <Th>Họ tên</Th>
                <Th>Số điện thoại</Th>
                <Th>Địa chỉ</Th>
                <Th>Tổng tiền</Th>
                <Th>Trạng thái đơn hàng</Th>
                <Th>Chi tiết</Th>
                <Th>Hủy đơn</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                donhang !== null
                  ?
                  donHangChuyenTrang
                  :
                  (donhang.slice(0, 12).map(donhangitem => (
                    <Tr>
                      <Td>{donhangitem.madathang}</Td>
                      <Td>{donhangitem.hotendathang}</Td>
                      <Td>{donhangitem.sodienthoaidathang}</Td>
                      <Td>{donhangitem.diachidathang}</Td>
                      <Td>{donhangitem.tongtiendathang ? format_money((donhangitem.tongtiendathang).toString()) : null}</Td>
                      {
                        donhangitem.tentrangthaidathang === "Chờ xác nhận"
                          ?
                          <Td style={{ backgroundColor: "var(--color-warning)" }}>{donhangitem.tentrangthaidathang}</Td>
                          :
                          donhangitem.tentrangthaidathang === "Đang giao dịch"
                            ?
                            <Td style={{ backgroundColor: "var(--color-info)" }}>{donhangitem.tentrangthaidathang}</Td>
                            :
                            donhangitem.tentrangthaidathang === "Hoàn thành"
                              ?
                              <Td style={{ backgroundColor: "var(--color-success)" }}>{donhangitem.tentrangthaidathang}</Td>
                              :
                              donhangitem.tentrangthaidathang === "Đã hủy"
                                ?
                                <Td style={{ backgroundColor: "var(--color-danger)" }}>{donhangitem.tentrangthaidathang}</Td>
                                : null
                      }
                      <Td className="info">
                        <ButtonInfo
                          onClick={() => openModal({ type: "chitietdonhang", donhang: donhangitem })}
                        >
                          <RemoveRedEyeOutlined />
                        </ButtonInfo>
                      </Td>
                      <Td className="danger">
                        <ButtonDelete
                          onClick={() => openModal({ type: "huydonhang", donhang: donhangitem  })}
                        >
                          <ClearOutlined />
                        </ButtonDelete>
                      </Td>
                    </Tr>
                  )))
              }
            </Tbody>
          </Table>
          <ReactPaginate
            previousLabel={"PREVIOUS"}
            nextLabel={"NEXT"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            nextClassName={"nextClassName"}
            pageLinkClassName={"pageLinkClassName"}
            forcePage={pageNumber}
          />
        </RecentOrders>
        <Modal
          showModal={showModal}   //state Đóng mở modal
          setShowModal={setShowModal} //Hàm Đóng mở modal
          type={typeModal}    //Loại modal
          donhang={donHangModal}  //Dữ liệu bên trong modal
          setReRenderData={setReRenderData}   //Hàm rerender khi dữ liệu thay đổi
          // handleClose={handleClose}   //Đóng tìm kiếm
          showToastFromOut={showToastFromOut} //Hàm hiện toast
        />

        {/* === TOAST === */}
        <Toast
          ref={toastRef}
          dataToast={dataToast}   // Thông tin cần hiện lên: Đối tượng { message,type }
        />
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default DonMua