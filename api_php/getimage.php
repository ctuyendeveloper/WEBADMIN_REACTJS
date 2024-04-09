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

$sqlQuery = "SELECT image.image_link FROM image INNER JOIN product ON image.product_id = product.product_id WHERE image.product_id = $id";

$stmt = $dbConn->prepare($sqlQuery);
$stmt->execute();

$news = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($news);

?>