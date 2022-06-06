import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        soluonggiohang: 0,
        tongtiengiohang: 0,
    },
    reducers: {
        themSanPham: (state, action)=> {
            let i;
            let isFind = false;
            for(i = 0; i < state.products.length; i++) {
                if(state.products[i].data[0].mathucung === parseInt(action.payload.data[0].mathucung)) {
                    const soluongtronggiohang = state.products[i].soluongmua;
                    const soluongcothemua = state.products[i].data[0].soluong - soluongtronggiohang;
                    const soluongmuonmua = action.payload.soluongmua;

                    if(soluongcothemua == 0) {
                        console.log("Số lượng mua đã đạt giới hạn");
                        return;
                    }
                    if(soluongmuonmua <= soluongcothemua) {
                        state.products[i].soluongmua += soluongmuonmua;
                        state.tongtiengiohang += action.payload.data[0].giamgia * soluongmuonmua;
                        console.log("So luong trong gio hang:"+soluongtronggiohang+" So luong co the mua: "+soluongcothemua+" So luong muon mua: "+soluongmuonmua)
                        console.log("Tìm thấy & cập nhật lại số lượng giỏ hàng thành công");
                        isFind = true;
                        break;
                    }else {
                        console.log("Số lượng không hợp lệ");
                        isFind = true;
                    }
                }
            }
            // Chưa có mã thú cưng này trong giỏ hàng
            if(!isFind) {
                state.products.push(action.payload);
                state.soluonggiohang += 1;
                state.tongtiengiohang += action.payload.data[0].giamgia * action.payload.soluongmua;
                console.log("Thêm vào giỏ hàng thành công");
                console.log("Them san pham: ", action.payload)
            }
        },
        capNhatSanPham: (state, action)=> {
            console.log("Cap nhat san pham: ", action.payload)
            let i;
            for(i = 0; i < state.products.length; i++) {
                if(state.products[i].data[0].mathucung === parseInt(action.payload.data[0].mathucung)) {
                    if(action.payload.soluongcapnhat === 0) {
                        state.products[i].soluongmua = action.payload.soluongcapnhat;
                        state.products.splice(i, 1);
                        state.soluonggiohang -= 1 ;
                        state.tongtiengiohang -= action.payload.data[0].giamgia * action.payload.soluongmua;
                    }
                    if(action.payload.soluongcapnhat === 1) {
                        state.products[i].soluongmua += 1;
                        state.tongtiengiohang += action.payload.data[0].giamgia * 1;
                    }
                    if(action.payload.soluongcapnhat === -1) {
                        state.products[i].soluongmua -= 1;
                        if(state.products[i].soluongmua <= 0){
                            state.products.splice(i, 1);
                            state.soluonggiohang -= 1 ;
                            state.tongtiengiohang -= action.payload.data[0].giamgia * action.payload.soluongmua;
                        }else {

                            state.tongtiengiohang -= action.payload.data[0].giamgia * 1;
                        }
                    }
                }
            }
            
        // themSanPham: (state, action)=> {
        //     console.log("Them san pham: ", action.payload)
        //     state.products.push(action.payload);
        //     state.soluonggiohang += 1;
        //     state.tongtiengiohang += action.payload.data[0].giamgia * action.payload.soluongmua;
        // },
        // capNhatSanPham: (state, action)=> {
        //     console.log("Cap nhat san pham: ", action.payload)

        //     state.products[0].soluongmua += action.payload.soluongmua; 
        //     // state.products.push(action.payload);
        //     // state.soluonggiohang += 1;
        //     state.tongtiengiohang += action.payload.data[0].giamgia * action.payload.soluongmua;
        // },
        },
        logoutCart: (state) => {
            state.products = [];
            state.soluonggiohang = 0;
            state.tongtiengiohang = 0;
        }
    }
});

export const { themSanPham, capNhatSanPham, logoutCart } = cartSlice.actions
export default cartSlice.reducer;