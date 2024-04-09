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

$sqlQuery = "SELECT bill.bill_id, bill.bill_createdat, customer.customer_name, orderdetail.orderdetail_price, bill.bill_status, product.product_name, product.product_price, orderdetail.orderdetail_quantity, bill.bill_note, address.address_detail, address.address_phone, address.address_name, bill.bill_paymentmethod
FROM orderdetail INNER JOIN bill ON bill.bill_id = orderdetail.bill_id INNER JOIN customer ON bill.customer_id = customer.customer_id INNER JOIN product ON product.product_id = orderdetail.product_id INNER JOIN address ON bill.address_id = address.address_id WHERE bill.bill_id = $id";

// $sqlQuery = "SELECT product.product_id, product.product_name, productcategory.productcategory_name, product.product_price, product.product_describe, product.product_promotionprice, productcategory.productcategory_id
// FROM product INNER JOIN productcategory ON product.productcategory_id = productcategory.productcategory_id ORDER BY product.product_id";

$stmt = $dbConn->prepare($sqlQuery);
$stmt->execute();

$news = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($news);

?>