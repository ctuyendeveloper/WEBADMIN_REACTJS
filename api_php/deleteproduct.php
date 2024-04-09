<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import file connection.php
include_once './connection.php';

// Lấy product_id từ URL
$id = $_GET['id'];

try {
    // Kiểm tra xem sản phẩm có tồn tại trong bảng product không
    $checkProductQuery = "SELECT COUNT(*) AS count FROM product WHERE product_id = $id";
    $stmt = $dbConn->prepare($checkProductQuery);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row['count'] > 0) {
        // Xóa tất cả hình ảnh của sản phẩm trong bảng image
        $deleteImagesQuery = "DELETE FROM image WHERE product_id = $id";
        $stmt = $dbConn->prepare($deleteImagesQuery);
        $stmt->execute();

        // Xóa sản phẩm từ bảng product
        $deleteProductQuery = "DELETE FROM product WHERE product_id = $id";
        $stmt = $dbConn->prepare($deleteProductQuery);
        $stmt->execute();

        // Trả về thông báo thành công
        echo json_encode(array('message' => 'Xóa sản phẩm thành công.'));
    } else {
        // Trả về thông báo lỗi nếu sản phẩm không tồn tại
        echo json_encode(array('message' => 'Sản phẩm không tồn tại.'));
    }
} catch (PDOException $e) {
    // Trả về thông báo lỗi nếu có lỗi xảy ra trong quá trình thực thi
    echo json_encode(array('message' => 'Xóa sản phẩm không thành công: ' . $e->getMessage()));
}
?>
