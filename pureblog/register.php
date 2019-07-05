<?php 
    include "layout.php";
    if ($_SESSION['func']!='admin' || !isset($_SESSION['logged'])) header("Location: forbidden.html");
?>
<title>Register</title>
<div class="absolute box-reg">
    <center><div style="font-family:Comic Sans MS;font-size:40px;margin:10px; ">Register</div></center>
    <form method="POST" action="register.php">
        <div style="margin: 10px;">
            <div class="item-reg">Fullname</div>
            <input placeholder="Fullname" type="text" name="fullname" required="required" class="form-reg">
        </div>
        <div style="margin: 10px;">
            <div class="item-reg">Username</div>
            <input placeholder="Username" type="text" name="username" required="required" class="form-reg">
        </div>
        <div style="margin: 10px;">
            <div class="item-reg">Password</div>
            <input placeholder="Password" type="password" name="pwd" required="required" class="form-reg">
        </div>
        <center><div>
            <button class="btn sub-btn" type="submit">Submit</button>
        </div></center>
    </form>
    <?php 
        if (isset($_POST['fullname']) && isset($_POST['username']) && isset($_POST['pwd'])){
            $result = mysqli_query($conn,"SELECT * FROM users WHERE id = (SELECT MAX(id) FROM users)");
            if (mysqli_num_rows($result)==0) $newid = 1;
            else{
                $data = mysqli_fetch_assoc($result);
                $newid = $data['id'] + 1;
            }
            $fullname = $_POST['fullname'];
            $username = $_POST['username'];
            $pwd = hash("md5",$_POST['pwd'],false);
            $func = "author";
            $result = mysqli_query($conn,"INSERT INTO users (id,username,password,func,fullname) VALUES($newid,'".$username."','".$pwd."','".$func."','".$fullname."');");
            mysqli_commit($conn);
            unset($newid);unset($username);unset($pwd);unset($func);unset($fullname);
            echo "<script>alert('Registered Successfully')</script>";
        }
    ?>
</div>
