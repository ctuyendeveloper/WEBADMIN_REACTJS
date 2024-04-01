<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://127.0.0.1:8686/update-news.php?id=2

// thêm mới tin tức

// import file connection.php

include_once './connection.php';

//   // đọc dữ liệu từ json
//   $data = json_decode(file_get_contents("php://input"));

//   // đặt biến
//   $title = $data->title;
//   $content = $data->content;
//   $user_id = $data->user_id;
//   $topic_id = $data->topic_id;
//   $id = $_GET['id'];

//   // cập nhật dữ liệu vào database

//   $sqlQuery = "UPDATE posts SET title = '$title', content = '$content', user_id = $user_id, topic_id = $topic_id, created_at = now() WHERE id = $id";


//   // thực thi câu lệnh pdo

//   $stmt = $dbConn->prepare($sqlQuery);
//   $stmt->execute();

//   // trả về thông báo
//   echo json_encode(array('message' => 'Cập nhật tin tức thành công.'));

try {
    // Đọc dữ liệu từ JSON
    $data = json_decode(file_get_contents("php://input"));

    // Lấy các thông tin từ dữ liệu
    $nameproduct = $data->nameproduct;
    $productcategory = $data->productcategory;
    $productprice = $data->productprice;
    $productdescribe = $data->productdescribe;
    $productpricemotion = $data->productpricemotion;
    $productcategoryid = $data->productcategoryid;
    $images = $data->images; // Mảng chứa các URL ảnh
    $id = $_GET['id'];

    // Kiểm tra xem sản phẩm có tồn tại trong bảng product không
    $checkProductQuery = "SELECT COUNT(*) AS count FROM product WHERE product_id = $id";
    $stmt = $dbConn->prepare($checkProductQuery);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);  

    if ($row['count'] > 0) {
        // Tiến hành cập nhật dữ liệu cho sản phẩm trong bảng product
        $updateProductQuery = "UPDATE product
                               INNER JOIN productcategory ON product.productcategory_id = productcategory.productcategory_id
                               SET product.product_name = '$nameproduct', 
                                   productcategory.productcategory_name = '$productcategory', 
                                   product.product_price = '$productprice', 
                                   product.product_promotionprice = '$productpricemotion',
                                   product.productcategory_id = '$productcategoryid',
                                   product.product_describe = '$productdescribe'
                               WHERE product.product_id = $id";
        $stmt = $dbConn->prepare($updateProductQuery);
        $stmt->execute();

        $deleteOldImagesQuery = "DELETE FROM image WHERE product_id = $id";
        $stmt = $dbConn->prepare($deleteOldImagesQuery);
        $stmt->execute();

        // Tiến hành thêm mới các ảnh vào bảng image và cập nhật nếu ảnh đã tồn tại
        foreach ($images as $image) {
            // Kiểm tra xem ảnh đã tồn tại trong bảng image hay chưa
            $checkImageQuery = "SELECT COUNT(*) AS count FROM image WHERE product_id = $id AND image_link = '$image'";
            $stmt = $dbConn->prepare($checkImageQuery);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row['count'] > 0) {
                // Nếu ảnh đã tồn tại, tiến hành cập nhật
                $updateImageQuery = "UPDATE image SET image_link = '$image' WHERE product_id = $id AND image_link = '$image'";
                $stmt = $dbConn->prepare($updateImageQuery);
                $stmt->execute();
            } else {
                // Nếu ảnh chưa tồn tại, tiến hành thêm mới
                $insertImageQuery = "INSERT INTO image (product_id, image_link) VALUES ($id, '$image')";
                $stmt = $dbConn->prepare($insertImageQuery);
                $stmt->execute();
            }
        }

        // Trả về thông báo
        echo json_encode(array(
            "status" => true, // login thành công,
            'message' => 'Cập nhật sản phẩm và thêm mới ảnh thành công.'));
    } else {
        // Trả về thông báo lỗi nếu sản phẩm không tồn tại
        echo json_encode(array(
            "status" => false, // login thành công,
            'message' => 'Sản phẩm không tồn tại.'));
    }
} catch (\Throwable $th) {
    echo json_encode(array(
        "status" => false, // login thành công,
        'message' => $th->getMessage()));
}
