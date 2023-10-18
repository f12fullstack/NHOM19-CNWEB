function kiemTraDuLieu() {
    var hoTen = document.getElementById("ho_ten").value;
    var ngaySinh = document.getElementById("ngay_sinh").value;
    var gioiTinh = document.getElementById("gioi_tinh").value;
    var truong = document.getElementById("truong").value;
    var lop = document.getElementById("lop").value;
    var soDienThoai = document.getElementById("so_dien_thoai").value;
    var diaChi = document.getElementById("dia_chi").value;

    var empty = '*Vui lòng không để trống'
    var check = true
    for (let i = 0; i < 5; i++) {
        document.getElementsByClassName('input-box')[i].textContent = ''
    }
    if (hoTen === '') {
        document.getElementsByClassName('input-box')[0].textContent = empty
        check = false
    }
    if (ngaySinh === '') {
        document.getElementsByClassName('input-box')[1].textContent = empty
        check = false
    }
    if (truong === '') {
        document.getElementsByClassName('input-box')[2].textContent = empty
        check = false
    }
    if (lop === '') {
        document.getElementsByClassName('input-box')[3].textContent = empty
        check = false
    }
    if (!soDienThoai) {
        document.getElementsByClassName('input-box')[4].textContent = empty
        check = false

    } else {
        if (!/^\d{10}$/.test(soDienThoai)) {
            document.getElementsByClassName('input-box')[4].textContent = "*Vui lòng nhập đúng số điện thoại"
            check = false
        }
    }
   
    if (check === false) return false
    alert('Gửi thông tin thành công!')
    return true
}
