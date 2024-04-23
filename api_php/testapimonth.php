<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import file connection.php
include_once './connection.php';

// Lấy tháng và năm hiện tại
$month = date('m');
$year = date('Y');

// Truy vấn để lấy doanh thu trong tháng và năm đã chọn
$sqlQuery = "SELECT 
                SUM(orderdetail.ORDERDETAIL_PRICE) AS monthly_revenue 
            FROM 
                bill 
                INNER JOIN orderdetail ON bill.BILL_ID = orderdetail.BILL_ID
            WHERE 
                MONTH(bill.BILL_CREATEDAT) = :month 
                AND YEAR(bill.BILL_CREATEDAT) = :year";

$stmt = $dbConn->prepare($sqlQuery);
$stmt->bindParam(':month', $month);
$stmt->bindParam(':year', $year);
$stmt->execute();

$monthlyRevenue = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($monthlyRevenue);
?>
