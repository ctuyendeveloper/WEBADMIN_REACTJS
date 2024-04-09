<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// Import file connection.php
include_once './connection.php';
//http://127.0.0.1:8686/update_productcategory.php


    try {
        if ($_SERVER["REQUEST_METHOD"]=="PUT") {
            $data = json_decode(file_get_contents("php://input"));

            $id = $data->PRODUCTCATEGORY_ID; // Assuming you have an 'id' field in your update request
            $name = $data->PRODUCTCATEGORY_NAME;
            $description = $data->PRODUCTCATEGORY_DESCRIBE;


            if (empty($name)) {
                echo json_encode(array(
                    "status" => false,
                    "message" => "Tên sản phẩm không được trống"
                ));
                return;
            }

              // Kiểm tra xem chủ đề đã tồn tại chưa (trừ chính nó)
        $check_query = $dbConn->prepare("SELECT * FROM PRODUCTCATEGORY WHERE PRODUCTCATEGORY_NAME = ? AND PRODUCTCATEGORY_ID != ?");
        $check_query->execute([$name, $id]);
        $check_productcatgory = $check_query->fetch(PDO::FETCH_ASSOC);

        if ($check_productcatgory) {
            echo json_encode(array(
                "status" => false,
                "message" => "Chủ đề đã tồn tại"
            ));
            return;
        }


        // Cập nhật chủ đề
        $update_query = $dbConn->prepare("UPDATE PRODUCTCATEGORY SET PRODUCTCATEGORY_NAME = ?, PRODUCTCATEGORY_DESCRIBE = ? WHERE PRODUCTCATEGORY_ID = ?");
        $result = $update_query->execute([$name, $description, $id]);

        if ($result) {
            echo json_encode(array(
                "status" => true,
                "message" => "Chủ đề đã được cập nhật"
            ));
        } else {
            echo json_encode(array(
                "status" => false,
                "message" => "Lỗi khi cập nhật chủ đề"
            ));
        }
        }

    } catch (\Throwable $th) {
        echo json_encode(array(
            "status" => false,
            "message" => $th->getMessage()
        ));
    }
?>
