<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import file connection.php
include_once './connection.php';
//http://127.0.0.1:8686/add_productcategory.php
        try {
            if ($_SERVER["REQUEST_METHOD"]=="POST") {
                // lấy dữ liệu 
                $data = json_decode(file_get_contents("php://input"));

                $name = $data->PRODUCTCATEGORY_NAME;
                $describe = $data->PRODUCTCATEGORY_DESCRIBE;


                if(empty($name)){
                    echo json_encode(array(
                        "status" => false,
                        "message" => "Tên không được trống"
                    ));
                    return; 
                }

                 // Kiểm tra xem loại sản phẩm  đã tồn tại chưa
        $check_query = $dbConn->prepare("SELECT * FROM PRODUCTCATEGORY WHERE PRODUCTCATEGORY_DESCRIBE = ?");
        $check_query->execute([$describe]);
        $all_describe = $check_query->fetch(PDO::FETCH_ASSOC);

        if ($all_describe) {
            echo json_encode(array(
                "status" => false,
                "message" => "loại này đã tồn tại"
            ));
            return;
        }
              // Tạo loại sản phẩm  mới
              $insert_query = $dbConn->prepare("INSERT INTO PRODUCTCATEGORY (PRODUCTCATEGORY_NAME, PRODUCTCATEGORY_DESCRIBE) VALUES (?, ?)");
              $result = $insert_query->execute([$name, $describe]);

        if ($result) {
            echo json_encode(array(
                "status" => true,
                "message" => "Chủ đề đã được tạo"
            ));
        } else {
            echo json_encode(array(
                "status" => false,
                "message" => "Lỗi khi tạo chủ đề"
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