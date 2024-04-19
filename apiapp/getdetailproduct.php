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
    $sqlQuery = "SELECT product.product_name, product.product_price, product.product_describe, productcategory.productcategory_name, 
                    image.image_link AS url, image.image_id AS image_id
                FROM product 
                INNER JOIN productcategory ON product.productcategory_id = productcategory.productcategory_id 
                LEFT JOIN image ON product.product_id = image.product_id 
                WHERE product.product_id = $id";

    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();
    
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Gom URL và ID vào một mảng
    $image_links = array();
    foreach ($news as $item) {
        $image_links[] = array(
            'url' => $item['url'],
            'image_id' => $item['image_id']
        );
    }

    // Gán mảng $image_links vào trường 'image_links' của phần tử đầu tiên trong $news và loại bỏ các trường url và image_id
    $firstItem = reset($news);
    $firstItem['image_links'] = $image_links;
    unset($firstItem['url']);
    unset($firstItem['image_id']);
    
    // Xóa các phần tử còn lại trong $news
    array_shift($news);

    echo json_encode(array(
        'status' => true,
        'data' => array($firstItem),
        'message' => 'Lấy danh sách sản phẩm thành công'));
} catch (PDOException $e) {
    // Xử lý lỗi nếu có
    echo json_encode(array(
        'status' => false,
        'message' => 'Gặp lỗi: ' . $e->getMessage()));
}


