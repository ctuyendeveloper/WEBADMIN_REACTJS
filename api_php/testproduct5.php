<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import file connection.php
include_once './connection.php';

// Truy vấn để lấy thông tin về 5 sản phẩm được đặt hàng nhiều nhất và tên của chúng
$sqlQuery = "SELECT 
                orderdetail.PRODUCT_ID, 
                product.PRODUCT_NAME, 
                SUM(orderdetail.ORDERDETAIL_QUANTITY) AS total_quantity 
            FROM 
                orderdetail 
                INNER JOIN product ON orderdetail.PRODUCT_ID = product.PRODUCT_ID
            GROUP BY 
                orderdetail.PRODUCT_ID, 
                product.PRODUCT_NAME
            ORDER BY 
                total_quantity DESC 
            LIMIT 5";

$stmt = $dbConn->prepare($sqlQuery);
$stmt->execute();

$topProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($topProducts);
?>
