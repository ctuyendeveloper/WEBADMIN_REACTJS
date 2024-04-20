<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';


// http://127.0.0.1:8686/statistical.php

$product_sql = "SELECT sum(PRODUCT_ID) as PRODUCT_ID FROM product";

$customer_sql = "SELECT sum(CUSTOMER_ID) as CUSTOMER_ID FROM customer";

$bill_sql = "SELECT sum(BILL_ID) as BILL_ID FROM bill";

// Chuẩn bị và thực thi truy vấn cho từng câu truy vấn
$stmt_product = $dbConn->prepare($product_sql);
$stmt_product->execute();
$product_result = $stmt_product->fetch();

$stmt_customer = $dbConn->prepare($customer_sql);
$stmt_customer->execute();
$customer_result = $stmt_customer->fetch();

$stmt_bill = $dbConn->prepare($bill_sql);
$stmt_bill->execute();
$bill_result = $stmt_bill->fetch();

// lấy tất cả dự liệu 
echo "Tổng số sản phẩm: " . $product_result['PRODUCT_ID']."<br>";
echo "Tổng số khách hàng: " . $customer_result['CUSTOMER_ID']."<br>";
echo "Tổng số hóa đơn: " . $bill_result['BILL_ID']."<br>";

