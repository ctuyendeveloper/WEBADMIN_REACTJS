<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import file connection.php
include_once './connection.php';

try {
    // Đọc dữ liệu từ JSON
    $data = json_decode(file_get_contents("php://input"));

    // Lấy các thông tin từ dữ liệu
    $addressdetail = isset($data->addressdetail) ? $data->addressdetail : null;
    $addressphone = isset($data->addressphone) ? $data->addressphone : null;
    $addresname = isset($data->addresname) ? $data->addresname : null;
    $customerid = isset($data->customerid) ? $data->customerid : null;

    // Kiểm tra xem các trường dữ liệu có được nhập đầy đủ không
    if ($addressdetail && $addressphone && $addresname && $customerid) {
        // Tiến hành thêm mới sản phẩm vào bảng product
        $insertProductQuery = "INSERT INTO address (address_detail, address_phone, address_name, customer_id) 
                               VALUES ('$addressdetail', '$addressphone', '$addresname', '$customerid')";
        $stmt = $dbConn->prepare($insertProductQuery);
        $stmt->execute();

        echo json_encode(array(
            "status" => true,
            'message' => 'Thêm mới sản phẩm thành công.'
        ));
    } else {
        echo json_encode(array(
            "status" => false,
            'message' => 'Vui lòng nhập đầy đủ thông tin.'
        ));
    }
} catch (\Throwable $th) {
    // Trả về thông báo lỗi nếu có lỗi xảy ra
    echo json_encode(array(
        "status" => false,
        'message' => $th->getMessage()
    ));
}