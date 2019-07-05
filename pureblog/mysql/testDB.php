<?php 
    include "conn.php";
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>TestingDB</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        table{
            position:relative;
            /* margin-top: 20px; */
            width:100%;
            border-collapse: collapse;
        }
        th,td{
            border:1px solid black;
            padding:5px 5px;
            font-size: 25px;
        }
        form{
            margin-top:25px;
        }
        .box{
            position:relative;
            flex:1;
            float:left;
            border:1px solid black;
        }
        .result{
            position :relative;
            border: 1px solid black;
            margin-top:10px;
            padding: 0px 5px;
        }
    </style>
</head>
<body>
    <?php 
        /*
        $conn là nguyên 1 cái cục database viết sẵn trong file conn.php 
        mysqli_query($conn,""); nghĩa là gọi thằng $conn làm gì trong "" . Ra lệnh cho ai làm gì
        execute xog thì phải fetch.
        */
    ?>
    
    <table>
        <tr>
            <th>ID</th>
            <th>username</th>
            <th>password</th>
        </tr>
            <?php 
                $command = mysqli_query($conn,"SELECT * FROM users;");
                $d1 = "Duc";
                for($i=0;$i<mysqli_num_rows($command);$i++){
                    $data = mysqli_fetch_assoc($command);
                    printf ("<tr>");
                    printf ("<td>%s</td>",$data['id']);
                    printf ("<td>%s</td>",$data['username']);
                    printf ("<td>%s</td>",$data['password']);
                    printf ("</tr>");
                }
            ?>
    </table>
    <div class="box">
        <form method="POST" action="testDB.php">
            <h3>Tìm kiếm bằng username</h3>
            <input value="" type="text" name="username">
            <button type="submit">Find</button>
        </form>
        <?php
            if (isset($_POST['username'])){ // isset nghĩa là xác định 1 biến có giá trị hay ko. giống như if (<biến>)
                $command = mysqli_query($conn,"SELECT * FROM users WHERE username='".$_POST['username']."'  ");
                // dòng trên là cách để truy xuất dữ liệu theo tin;
                // Có thể dùng loop để truy xuất những thằng có 1 cột nào đó giống nhau ra 
                $data = mysqli_fetch_assoc($command);
                if ($data){
                    echo "<div class='result'>";
                    printf("<p><strong>ID : </strong>%s</p>",$data['id']);
                    printf("<p><strong>Username : </strong>%s</p>",$data['username']);
                    printf("<p><strong>Password : </strong>%s</p>",$data['password']);
                    echo "</div>";
                }
            }
        ?>
    </div>
    <div class="box">
        <form method="POST" action="testDB.php">
            <h3>Tạo mới</h3>
            <input placeholder="Username" type="text" required="required" value="" name="new_username"><br>
            <input placeholder="Password" type="text" required="required" value="" name="new_password"><br>
            <button type="submit">Create</button>
        <form>
        <?php // Form đăng ký 
            if (isset($_POST['new_username']) && isset($_POST['new_password'])){
                $command = mysqli_query($conn,"SELECT * FROM users WHERE id=(SELECT MAX(id) FROM users);");
                if (mysqli_num_rows($command)==0) $newid = 1;
                else{
                    $data = mysqli_fetch_assoc($command);
                    $newid = $data['id']+1;
                } 
                $command = mysqli_query($conn,"INSERT INTO users (id,username,password) VALUES(".$newid.",'".$_POST['new_username']."','".$_POST['new_password']."'); ");
                $command = mysqli_commit($conn);
                header("Location: testDB.php"); // function reload page trong php    
            }
        ?>
    </div>
</body>
</html>