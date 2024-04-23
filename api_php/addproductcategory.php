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
    $categoryName = $data->categoryName;
    $categoryDescribe = $data->categoryDescribe;

    // Tiến hành thêm mới loại sản phẩm vào bảng product_category
    $insertCategoryQuery = "INSERT INTO productcategory (PRODUCTCATEGORY_NAME, PRODUCTCATEGORY_DESCRIBE) 
                            VALUES ('$categoryName', '$categoryDescribe')";
    $stmt = $dbConn->prepare($insertCategoryQuery);
    $stmt->execute();

    // Trả về thông báo thành công
    echo json_encode(array(
        "status" => true,
        'message' => 'Thêm mới loại sản phẩm thành công.'));
} catch (\Throwable $th) {
    // Trả về thông báo lỗi nếu có lỗi xảy ra
    echo json_encode(array(
        "status" => false,
        'message' => $th->getMessage()));
}
?>
