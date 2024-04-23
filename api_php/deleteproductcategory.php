<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import file connection.php
include_once './connection.php';

try {
    // Đọc dữ liệu từ JSON
    $data = json_decode(file_get_contents("php://input"));

    // Lấy ID loại sản phẩm từ dữ liệu
    $id = $_GET['id'];

    // Kiểm tra xem loại sản phẩm có đang được sử dụng trong bảng sản phẩm không
    $checkProductQuery = "SELECT COUNT(*) AS productCount FROM product WHERE productcategory_id = '$id'";
    $stmt = $dbConn->prepare($checkProductQuery);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result['productCount'] > 0) {
        // Nếu loại sản phẩm đang được sử dụng trong bảng sản phẩm, không thực hiện việc xóa
        echo json_encode(array(
            "status" => false,
            'message' => 'Loại sản phẩm này đang được sử dụng cho sản phẩm khác. Không thể xóa.'
        ));
    } else {
        // Nếu loại sản phẩm không được sử dụng trong bảng sản phẩm, tiến hành xóa
        $deleteCategoryQuery = "DELETE FROM productcategory WHERE productcategory_id = '$id'";
        $stmt = $dbConn->prepare($deleteCategoryQuery);
        $stmt->execute();

        // Trả về thông báo thành công
        echo json_encode(array(
            "status" => true,
            'message' => 'Xóa loại sản phẩm thành công.'
        ));
    }
} catch (\Throwable $th) {
    // Trả về thông báo lỗi nếu có lỗi xảy ra
    echo json_encode(array(
        "status" => false,
        'message' => $th->getMessage()
    ));
}
?>
