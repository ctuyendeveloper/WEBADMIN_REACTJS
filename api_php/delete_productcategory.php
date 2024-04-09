<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// Import file connection.php
include_once './connection.php';
//http://127.0.0.1:8686/delete_productcategory.php?id=1

try {
    if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
        // Check if 'id' is set in the URL parameters
        if (!isset($_GET['id'])) {
            echo json_encode(array(
                "status" => false,
                "message" => "Missing 'id' parameter in the request"
            ));
            return;
        }

        $id = $_GET['id'];

        // Delete the topic using prepared statement
        $deleteQuery = $dbConn->prepare("DELETE FROM PRODUCTCATEGORY WHERE PRODUCTCATEGORY_ID = ?");
        $result = $deleteQuery->execute([$id]);

        if ($result) {
            echo json_encode(array(
                "status" => true,
                "message" => "Xóa loại sản phẩm thành công"
            ));
        } else {
            echo json_encode(array(
                "status" => false,
                "message" => "Lỗi khi xóa loại sản phẩm "
            ));
        }
    }
} catch (Exception $e) {
    echo json_encode(array(
        "status" => false,
        "message" => $e->getMessage()
    ));
}
?>