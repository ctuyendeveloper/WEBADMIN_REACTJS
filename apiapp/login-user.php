<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// http://127.0.0.1:8686/login.php


// import file connection.php

include_once './connection.php';

try {
    // đọc dữ liệu từ json
    $data = json_decode(file_get_contents("php://input"));

    // đọc dữ liệu từ json
    $email = $data->email;
    $password = $data->password;

    // thêm mới dữ liệu

    $sqlQuery = "SELECT * FROM customer WHERE customer_email = '$email'";


    // thực thi câu lệnh pdo

    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();


    // lấy dữ liệu từ database
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    // kiểm tra dữ liệu
    // echo json_encode(
    //     array(
    //         "status" => true, // login thành công
    //         "user" => $user
    //     )
    // );

    if($user)
    {
        // kiểm tra mật khẩu
        // $check = password_verify($password, $user['ADMIN_PASSWORD']);
        if($password !== $user['CUSTOMER_PASSWORD'])
        {
            echo json_encode(
                array(
                "status" => false, // login thành công
                "message" => "Mật khẩu không chính xác"
                )
            );
            return;
        }
        echo json_encode(
            array(
            "status" => true, // login thành công
            "user" => $user,
            "message" => "Login thành công"
            )
        );
    } else {
        echo json_encode(array(
            "status" => false, // login không thành công
            "user" => null,
            "message" => "Không có user"
        ));
    }
} catch (Exception $e) {
    echo json_encode(array('message' => $e->getMessage()));
}
