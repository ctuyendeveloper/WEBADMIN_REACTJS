<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// http://127.0.0.1:8686/get-listproduct.php


// import file connection.php

include_once './connection.php';

try {
    $sqlQuery = "SELECT orderdetail.orderdetail_id, orderdetail.orderdetail_quantity, orderdetail.orderdetail_price, bill.bill_createdat, bill.bill_status, bill.bill_note, bill.bill_paymentmethod, address.address_detail, address.address_phone, address.address_name, product.product_name, product.product_price FROM orderdetail 
    INNER JOIN bill ON bill.bill_id = orderdetail.bill_id INNER JOIN address ON bill.address_id = address.address_id INNER JOIN product ON orderdetail.product_id = product.product_id ";

    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();

    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array(
        'status' => true,
        'data' => $news,
        'message' => 'Lấy danh sách hóa đơn thành công'
    ));
} catch (PDOException $e) {
    // Trả về thông báo lỗi nếu có lỗi xảy ra trong quá trình thực thi
    echo json_encode(array(
        'status' => false,
        'message' => 'Gặp lỗi: ' . $e->getMessage()
    ));
}
