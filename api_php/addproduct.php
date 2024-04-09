<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import file connection.php
include_once './connection.php';

try {
    // Đọc dữ liệu từ JSON
    $data = json_decode(file_get_contents("php://input"));

    // Lấy các thông tin từ dữ liệu
    $nameproduct = $data->nameproduct;
    $productprice = $data->productprice;
    $productpricemotion = $data->productpricemotion;
    $productdescribe = $data->productdescribe;
    $productcategoryid = $data->productcategoryid;
    $images = $data->images; // Mảng chứa các URL ảnh

    // Tiến hành thêm mới sản phẩm vào bảng product
    $insertProductQuery = "INSERT INTO product (product_name, product_price, product_promotionprice, productcategory_id, product_describe) 
                           VALUES ('$nameproduct', '$productprice', '$productpricemotion', '$productcategoryid', '$productdescribe')";
    $stmt = $dbConn->prepare($insertProductQuery);
    $stmt->execute();

    // Lấy ID của sản phẩm vừa được thêm mới
    $productId = $dbConn->lastInsertId();

    // Tiến hành thêm mới các ảnh vào bảng image
    foreach ($images as $image) {
        $insertImageQuery = "INSERT INTO image (product_id, image_link) VALUES ('$productId', '$image')";
        $stmt = $dbConn->prepare($insertImageQuery);
        $stmt->execute();
    }

    // Trả về thông báo thành công
    echo json_encode(array(
        "status" => true,
        'message' => 'Thêm mới sản phẩm thành công.'));
} catch (\Throwable $th) {
    // Trả về thông báo lỗi nếu có lỗi xảy ra
    echo json_encode(array(
        "status" => false,
        'message' => $th->getMessage()));
}
?>
