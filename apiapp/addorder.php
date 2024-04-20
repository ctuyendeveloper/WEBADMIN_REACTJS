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

    // Kiểm tra dữ liệu được truyền vào
    if (
        isset($data->billStatus) &&
        isset($data->billPaymentMethod) &&
        isset($data->addressId) &&
        isset($data->customerId) &&
        isset($data->products) && !empty($data->products)
    ) {
        // Lấy thông tin từ dữ liệu
        $billStatus = $data->billStatus;
        $billPaymentMethod = $data->billPaymentMethod;
        $billNote = isset($data->billNote) ? $data->billNote : null; // Kiểm tra xem có ghi chú không
        $addressId = $data->addressId;
        $customerId = $data->customerId;
        $products = $data->products;

        // Tiến hành thêm mới hóa đơn
        $insertBillQuery = "INSERT INTO bill (BILL_CREATEDAT, BILL_STATUS, BILL_PAYMENTMETHOD, BILL_NOTE, ADDRESS_ID, CUSTOMER_ID) 
                            VALUES (now(), '$billStatus', '$billPaymentMethod', '$billNote', '$addressId', '$customerId')";
        $stmt = $dbConn->prepare($insertBillQuery);
        $stmt->execute();

        // Lấy ID của hóa đơn vừa được thêm mới
        $billId = $dbConn->lastInsertId();

        // Thêm dữ liệu vào bảng orderdetail
        foreach ($products as $product) {
            $productId = $product->productId; // Lấy ID của sản phẩm
            $quantity = $product->quantity; // Lấy số lượng của sản phẩm
            $totalPrice = $product->totalPrice; // Lấy tổng giá của sản phẩm

            // Thực hiện câu lệnh INSERT vào bảng orderdetail cho từng sản phẩm
            $insertOrderDetailQuery = "INSERT INTO orderdetail (ORDERDETAIL_QUANTITY, ORDERDETAIL_PRICE, PRODUCT_ID, BILL_ID) 
                                       VALUES ('$quantity', '$totalPrice', '$productId', '$billId')";
            $stmt = $dbConn->prepare($insertOrderDetailQuery);
            $stmt->execute();
        }

        // Trả về thông báo thành công
        echo json_encode(array(
            "status" => true,
            "message" => "Thêm mới dữ liệu thành công."
        ));
    } else {
        // Trả về thông báo lỗi nếu dữ liệu không đủ hoặc không hợp lệ
        echo json_encode(array(
            "status" => false,
            "message" => "Dữ liệu không đủ hoặc không hợp lệ."
        ));
    }
} catch (\Throwable $th) {
    // Trả về thông báo lỗi nếu có lỗi xảy ra
    echo json_encode(array(
        "status" => false,
        "message" => $th->getMessage()
    ));
}
?>
