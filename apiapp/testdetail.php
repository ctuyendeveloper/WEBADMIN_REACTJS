<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// import file connection.php
include_once './connection.php';

try {
    $id = $_GET['id'];
    $sqlQuery = "SELECT bill.bill_id, 
                        bill.bill_createdat, 
                        bill.bill_status, 
                        bill.bill_paymentmethod, 
                        bill.bill_note, 
                        address.address_detail AS ADDRESS_DETAIL, 
                        customer.customer_name AS CUSTOMER_NAME, 
                        SUM(orderdetail.orderdetail_quantity * product.product_price) AS total_price,
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'ORDERDETAIL_ID', orderdetail.orderdetail_id, 
                                'ORDERDETAIL_QUANTITY', orderdetail.orderdetail_quantity,
                                'ORDERDETAIL_PRICE', orderdetail.orderdetail_price,
                                'PRODUCT_ID', product.product_id,
                                'PRODUCT', JSON_OBJECT('name', product.product_name, 'price', product.product_price)
                            )
                        ) AS ORDERDETAIL
                    FROM bill 
                    INNER JOIN orderdetail ON bill.bill_id = orderdetail.bill_id 
                    INNER JOIN address ON bill.address_id = address.address_id 
                    INNER JOIN product ON orderdetail.product_id = product.product_id
                    INNER JOIN customer ON bill.customer_id = customer.customer_id
                    WHERE bill.customer_id = $id
                    GROUP BY bill.bill_id";

    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();

    $bills = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Chuyển đổi dữ liệu trả về để phù hợp với cấu trúc mẫu
    $formattedData = array();
    foreach ($bills as $bill) {
        // Tạo một mảng chứa thông tin về hóa đơn
        $formattedBill = array(
            "BILL_ID" => $bill["bill_id"],
            "BILL_CREATEDAT" => $bill["bill_createdat"],
            "BILL_STATUS" => $bill["bill_status"],
            "BILL_PAYMENTMETHOD" => $bill["bill_paymentmethod"],
            "BILL_NOTE" => $bill["bill_note"],
            "ADDRESS_DETAIL" => $bill["ADDRESS_DETAIL"],
            "CUSTOMER_NAME" => $bill["CUSTOMER_NAME"],
            "ORDERDETAIL" => json_decode($bill["ORDERDETAIL"], true), // Chuyển đổi chuỗi JSON thành mảng PHP
            "totalPrice" => $bill["total_price"]
        );
        // Thêm hóa đơn đã định dạng vào mảng kết quả
        $formattedData[] = $formattedBill;
    }

    echo json_encode(array(
        'status' => true,
        'data' => $formattedData,
        'message' => 'Lấy danh sách hóa đơn thành công'
    ));
} catch (PDOException $e) {
    // Trả về thông báo lỗi nếu có lỗi xảy ra trong quá trình thực thi
    echo json_encode(array(
        'status' => false,
        'message' => 'Gặp lỗi: ' . $e->getMessage()
    ));
}
