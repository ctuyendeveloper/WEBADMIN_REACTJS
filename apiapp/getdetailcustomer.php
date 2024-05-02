<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// http://127.0.0.1:8686/get-listproduct.php


// import file connection.php

include_once './connection.php';
$id = $_GET['id'];

try {
    $sqlQuery = "SELECT * FROM customer WHERE customer_id = $id";

    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();

    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array(
        'status' => true,
        'data' => $news,
        'message' => 'Lấy thông tin người dùng thành công'
    ));
} catch (PDOException $e) {
    // Trả về thông báo lỗi nếu có lỗi xảy ra trong quá trình thực thi
    echo json_encode(array(
        'status' => false,
        'message' => 'Gặp lỗi: ' . $e->getMessage()
    ));
}
